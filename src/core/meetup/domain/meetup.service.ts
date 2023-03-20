import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { Meetup } from './meetup.entity';

import { Flag } from 'src/core/flag/domain/flag.entity';
import { FlagService } from 'src/core/flag/domain/flag.service';

import { defaultPagination } from 'src/common/constants/pagination.constants';
import { defaultSorting } from 'src/common/constants/sorting.constants';

import { ReadAllResult } from 'src/common/types/read-all.options';
import { IReadAllMeetupOptions } from '../infrastructure/read-all-meetup.interface';

import { MeetupFiltration } from './meetup.filter';

import { CreateMeetupDto } from '../presentation/dto/create-meetup.dto';
import { MeetupOptions } from '../presentation/dto/find-meetup.options';
import { UpdateMeetupDto } from '../presentation/dto/update-meetup.dto';

@Injectable()
export class MeetupService {
	constructor(
		@InjectModel(Meetup) private meetupRepository: typeof Meetup,
		private flagService: FlagService,
	) {}

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
					all: true,
					where: filter.flagsFilters,
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
		createMeetupDto: CreateMeetupDto,
		transaction: Transaction,
	): Promise<Meetup> {
		const resultFlags = await this.flagArrayHandler(createMeetupDto.flags);

		const { flags, ...rest } = createMeetupDto;

		const createdMeetup = await this.meetupRepository.create(createMeetupDto, {
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
		updateMeetupDto: UpdateMeetupDto,
		transaction: Transaction,
	): Promise<Meetup> {
		const existingMeetup = await this.findBy({ id: id });

		if (!existingMeetup) {
			throw new BadRequestException("Such meetup doesn't exist");
		}

		const { flags, ...meetupUpdateOptions } = updateMeetupDto;

		await this.meetupRepository.update(meetupUpdateOptions, {
			where: { id },
			transaction,
			returning: true,
		});

		const existingFlags: Flag[] = await existingMeetup.$get('flags');
		await existingMeetup.$remove('flags', existingFlags, { transaction });

		const resultFlags = await this.flagArrayHandler(flags);
		await existingMeetup.$add('flags', resultFlags, { transaction });

		const updatedMeetup = await this.findBy({ id });

		return updatedMeetup;
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
