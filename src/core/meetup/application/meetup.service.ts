import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { Meetup } from '../domain/meetup.entity';

import { Flag } from 'src/core/flag/domain/flag.entity';
import { FlagService } from 'src/core/flag/application/flag.service';

import { defaultPagination } from 'src/common/constants/pagination.constants';
import { defaultSorting } from 'src/common/constants/sorting.constants';

import { ReadAllResult } from 'src/common/types/read-all.options';
import { IReadAllMeetupOptions } from '../domain/interfaces/read-all-meetup.interface';

import { MeetupFiltration } from '../domain/filters/meetup.filter';

import { CreateMeetupDto } from '../domain/dto/create-meetup.dto';
import { MeetupOptions } from '../domain/dto/find-meetup.options';
import { UpdateMeetupDto } from '../domain/dto/update-meetup.dto';
import { UserService } from 'src/core/user/application/user.service';
import { User } from 'src/core/user/domain/user.entity';

@Injectable()
export class MeetupService {
	constructor(
		@InjectModel(Meetup) private meetupRepository: typeof Meetup,
		private flagService: FlagService,
		private userService: UserService,
	) {}

	public async registerForMeetup(
		userId: number,
		meetupId: number,
		transaction: Transaction,
	) {
		const meetup = await this.findOne({ id: meetupId });
		const user = await this.userService.findOne({ id: userId });

		if (meetup.author.id == user.id) {
			throw new BadRequestException('you are already registered like author');
		}

		const members = await meetup.$get('members', { transaction });
		const alreadyRegistered = members.find((user: User) => user.id === user.id);

		if (alreadyRegistered) {
			throw new BadRequestException('you are already registered');
		}

		await meetup.$add('members', user, { transaction });

		const newMeetup = await this.findOne({ id: meetup.id });
		newMeetup.members.push(user);

		return newMeetup;
	}

	public async unregisterForMeetup(
		userId: number,
		meetupId: number,
		transaction: Transaction,
	) {
		const meetup = await this.findOne({ id: meetupId });
		const user = await this.userService.findOne({ id: userId });

		const members = await meetup.$get('members', { transaction });
		const alreadyRegistered = members.find((user: User) => user.id === user.id);

		if (!alreadyRegistered) {
			throw new BadRequestException("you aren't member of this meetup");
		}
		await meetup.$remove('members', user, { transaction });

		const newMeetup = await this.findOne({ id: meetup.id });
		newMeetup.members = members.filter((member) => member.id != user.id);

		return newMeetup;
	}

	public async findOne(options: MeetupOptions): Promise<Meetup> {
		const suitableMeetup = await this.findBy({ ...options });

		if (!suitableMeetup) {
			throw new BadRequestException("There isn't suitable meetup");
		}

		return suitableMeetup;
	}

	public async findAll(
		options: IReadAllMeetupOptions,
	): Promise<ReadAllResult<Meetup>> {
		const pagination = options.pagination ?? defaultPagination;
		const sorting = options.sorting ?? defaultSorting;
		const filter = MeetupFiltration.getLikeFilters(options.filter);

		const { count, rows } = await this.meetupRepository.findAndCountAll({
			where: { ...filter.meetupFilters },
			include: [
				{
					model: Flag,
					where: filter.flagsFilters,
				},
				{
					model: User,
					as: 'author',
				},
				{
					model: User,
					as: 'members',
				},
			],
			distinct: true,
			limit: pagination.size,
			offset: pagination.offset,
			order: [[sorting.column, sorting.direction]],
		});

		for (let i = 0; i < rows.length; i++) {
			rows[i].flags = await rows[i].$get('flags');
		}

		return {
			totalRecordsNumber: count,
			entities: rows,
		};
	}

	public async findBy(options: MeetupOptions): Promise<Meetup> {
		const suitableMeetup = await this.meetupRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableMeetup;
	}

	private async flagArrayHandler(flags: string[]): Promise<Flag[]> {
		let resultFlags: Flag[] = [];

		for await (const flag of flags) {
			const existingFlag = await this.flagService.findBy({
				name: flag,
			});

			resultFlags.push(
				!existingFlag
					? await this.flagService.create({
							name: flag,
					  })
					: existingFlag,
			);
		}

		return resultFlags;
	}

	public async create(
		createMeetupDto: CreateMeetupDto,
		transaction: Transaction,
		userId: number,
	): Promise<Meetup> {
		const resultFlags = await this.flagArrayHandler(createMeetupDto.flags);

		const { flags, ...rest } = createMeetupDto;

		const createdMeetup = await this.meetupRepository.create(createMeetupDto, {
			transaction,
		});

		const user = await this.userService.findOne({ id: userId });
		await createdMeetup.$set('author', user, { transaction });

		for await (const flag of resultFlags) {
			await createdMeetup.$add('flags', flag, { transaction });
		}

		createdMeetup.flags = resultFlags;
		createdMeetup.author = user;
		createdMeetup.members = [];

		await createdMeetup.save({ transaction });

		return createdMeetup;
	}

	public async update(
		id: number,
		updateMeetupDto: UpdateMeetupDto,
		transaction: Transaction,
	): Promise<Meetup> {
		const existingMeetup = await this.findBy({ id: id });

		if (!existingMeetup) {
			throw new BadRequestException("Such meetup doesn't exist");
		}

		const { flags, ...meetupUpdateOptions } = updateMeetupDto;

		const [numberUpdatedRows, updatedMeetups] =
			await this.meetupRepository.update(meetupUpdateOptions, {
				where: { id },
				transaction,
				returning: true,
			});

		let newFlags: Flag[];
		if (flags) {
			const existingFlags: Flag[] = await existingMeetup.$get('flags');
			await existingMeetup.$remove('flags', existingFlags, { transaction });

			newFlags = await this.flagArrayHandler(flags);
			await existingMeetup.$add('flags', newFlags, { transaction });
		}

		updatedMeetups[0].flags = newFlags?.length
			? newFlags
			: existingMeetup.flags;

		const members = await updatedMeetups[0].$get('members', {
			transaction,
		});
		updatedMeetups[0].members = members;

		const author = await updatedMeetups[0].$get('author', {
			transaction,
		});
		updatedMeetups[0].author = author;

		return updatedMeetups[0];
	}

	public async delete(id: number, transaction: Transaction): Promise<void> {
		const numberDeletedRows = await this.meetupRepository.destroy({
			where: { id },
			transaction,
		});

		if (!numberDeletedRows)
			throw new BadRequestException('There is no suitable meetup');
	}
}
