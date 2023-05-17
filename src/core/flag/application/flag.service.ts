import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { defaultPagination } from 'src/common/constants/pagination.constants';
import { defaultSorting } from 'src/common/constants/sorting.constants';

import { ReadAllResult } from 'src/common/types/read-all.options';

import { CreateFlagDto } from '../domain/dto/create-flag.dto';
import { UpdateFlagDto } from '../domain/dto/update-flag.dto';

import { IReadAllFlagOptions } from '../domain/interfaces/read-all-flag.interface';

import { FlagFiltration } from '../domain/filters/flag.filter';
import { Flag } from '../domain/flag.entity';

@Injectable()
export class FlagService {
	constructor(@InjectModel(Flag) private flagRepository: typeof Flag) {}

	public async findOne(options: UpdateFlagDto): Promise<Flag> {
		const suitableFlag = await this.findBy({ ...options });

		if (!suitableFlag) {
			throw new BadRequestException("There isn't suitable flag");
		}

		return suitableFlag;
	}

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

	public async findBy(options: UpdateFlagDto): Promise<Flag> {
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

	public async update(id: number, flagOptions: UpdateFlagDto): Promise<Flag> {
		const existingFlag = await this.findBy({ id: id });

		if (!existingFlag) {
			throw new BadRequestException("Such flag doesn't exist");
		}

		const sameFlag = await this.findBy({ name: flagOptions.name });

		if (sameFlag) {
			throw new BadRequestException('Such flag already exists');
		}

		const [numberUpdatedRows, updatedFlags] = await this.flagRepository.update(
			flagOptions,
			{
				where: { id },
				returning: true,
			},
		);

		return updatedFlags[0];
	}

	public async delete(id: number): Promise<void> {
		const numberDeletedRows = await this.flagRepository.destroy({
			where: { id },
		});

		if (!numberDeletedRows)
			throw new BadRequestException('There is no suitable flag');
	}
}
