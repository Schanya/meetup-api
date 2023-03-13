import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction } from 'sequelize';

import {
	MeetupDto,
	MeetupOptions,
	UpdateMeetupOptions,
} from '../presentation/meetup.dto';
import { Meetup } from './meetup.entity';

import { Flag } from 'src/core/flag/domain/flag.entity';
import { FlagService } from 'src/core/flag/domain/flag.service';
import { IReadAllMeetupOptions } from '../presentation/meetup.type';
import { defaultPagination } from 'src/common/costans/pagination.constants';

@Injectable()
export class MeetupService {
	constructor(
		@InjectModel(Meetup) private meetupRepository: typeof Meetup,
		private flagService: FlagService,
	) {}

	public async findAll(options: IReadAllMeetupOptions): Promise<Meetup[]> {
		let { pagination, sorting, filter } = options;

		pagination = pagination ?? defaultPagination;
		sorting = sorting ?? { column: 'title', direction: 'ASC' };

		let filterOptions = {};

		Object.keys(filter).map((el, i) => {
			filterOptions[el] = { [Op.like]: `%${Object.values(filter)[i]}%` };
		});

		const suitableMeetups = await this.meetupRepository.findAll({
			where: { ...filterOptions },
			include: { all: true },
			limit: pagination.size,
			offset: pagination.offset,
			order: [[sorting.column, sorting.direction]],
		});

		return suitableMeetups;
	}

	public async findBy(options: MeetupOptions): Promise<Meetup> {
		const suitableMeetup = await this.meetupRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		if (!suitableMeetup) {
			throw new BadRequestException("There isn't suitable meetup");
		}

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
		meetupDto: MeetupDto,
		transaction: Transaction,
	): Promise<Meetup> {
		const resultFlags = await this.flagArrayHandler(meetupDto.flags);

		const { flags, ...rest } = meetupDto;

		const createdMeetup = await this.meetupRepository.create(meetupDto, {
			transaction,
		});

		for await (const flag of resultFlags) {
			await createdMeetup.$add('flags', flag, { transaction });
		}

		createdMeetup.flags = resultFlags;

		await createdMeetup.save({ transaction });

		return createdMeetup;
	}

	public async update(
		id: number,
		meetupOptions: MeetupOptions,
		transaction: Transaction,
	): Promise<Meetup> {
		const existingMeetup = await this.findBy({ id: id });

		if (!existingMeetup) {
			throw new BadRequestException("Such meetup doesn't exist");
		}

		const updateMeetupOptions: UpdateMeetupOptions = {
			...meetupOptions,
		};

		await this.meetupRepository.update(updateMeetupOptions, {
			where: { id },
			transaction,
		});

		const existingFlags: Flag[] = await existingMeetup.$get('flags');
		await existingMeetup.$remove('flags', existingFlags, { transaction });

		const resultFlags = await this.flagArrayHandler(meetupOptions.flags);
		await existingMeetup.$add('flags', resultFlags, { transaction });

		existingMeetup.flags = resultFlags;

		return existingMeetup;
	}

	public async delete(id: number, transaction: Transaction): Promise<number> {
		const numberDeletedRows = await this.meetupRepository.destroy({
			where: { id },
			transaction,
		});

		if (!numberDeletedRows)
			throw new BadRequestException('There is no suitable meetup');

		return numberDeletedRows;
	}
}
