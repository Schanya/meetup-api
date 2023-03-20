import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { defaultPagination } from 'src/common/constants/pagination.constants';
import { defaultSorting } from 'src/common/constants/sorting.constants';

import { ReadAllResult } from 'src/common/types/read-all.options';

import { CreateFlagDto } from '../presentation/dto/create-flag.dto';
import { FlagOptions } from '../presentation/dto/find-flag.options';

import { IReadAllFlagOptions } from '../infrastructure/read-all-flag.interface';

import { Flag } from './flag.entity';
import { FlagFiltration } from './flag.filter';

@Injectable()
export class FlagService {
	constructor(@InjectModel(Flag) private flagRepository: typeof Flag) {}

	public async findAll(
		options: IReadAllFlagOptions,
	): Promise<ReadAllResult<Flag>> {
		const pagination = options.pagination ?? defaultPagination;
		const sorting = options.sorting ?? defaultSorting;
		const filter = FlagFiltration.getLikeFilters(options.filter);

		const { count, rows } = await this.flagRepository.findAndCountAll({
			where: { ...filter.flagsFilters },
			include: { all: true },
			distinct: true,
			limit: pagination.size,
			offset: pagination.offset,
			order: [[sorting.column, sorting.direction]],
		});

		return {
			totalRecordsNumber: count,
			entities: rows,
		};
	}

	public async findBy(options: FlagOptions): Promise<Flag> {
		const suitableFlag = await this.flagRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableFlag;
	}

	public async create(createFlagDto: CreateFlagDto): Promise<Flag> {
		const existingFlag = await this.findBy({ name: createFlagDto.name });

		if (existingFlag) {
			throw new BadRequestException('Such flag has already exist');
		}

		return await this.flagRepository.create(createFlagDto);
	}

	public async update(id: number, flagOptions: FlagOptions): Promise<Flag> {
		const existingFlag = await this.findBy({ id: id });

		if (!existingFlag) {
			throw new BadRequestException("Such meetup doesn't exist");
		}

		const sameFlag = await this.findBy({ name: flagOptions.name });

		if (sameFlag) {
			throw new BadRequestException('Such meetup already exists');
		}

		await this.flagRepository.update(flagOptions, { where: { id } });

		const updatedFlag = await this.findBy({ id: id });

		return updatedFlag;
	}

	public async delete(id: number): Promise<number> {
		const numberDeletedRows = await this.flagRepository.destroy({
			where: { id },
		});

		if (!numberDeletedRows)
			throw new BadRequestException('There is no suitable meetup');

		return numberDeletedRows;
	}
}
