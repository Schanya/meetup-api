import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ReadAllResult } from 'src/common/types/read-all.options';
import { Flag } from '../domain/flag.entity';
import { FlagService } from '../domain/flag.service';
import { CreateFlagDto } from '../presentation/dto/create-flag.dto';
import { FlagOptions } from '../presentation/dto/find-flag.options';
import { ReadAllFlagDto } from '../presentation/dto/read-all-flag.dto';

import { FrontendFlag } from '../presentation/types/flag.type';

@Controller('flag')
export class FlagController {
	constructor(readonly flagService: FlagService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(
		@Query() readAllFlagDto: ReadAllFlagDto,
	): Promise<ReadAllResult<FrontendFlag>> {
		const { pagination, sorting, ...filter } = readAllFlagDto;

		const flags = await this.flagService.findAll({
			pagination,
			sorting,
			filter,
		});

		return {
			totalRecordsNumber: flags.totalRecordsNumber,
			entities: flags.entities.map((meetup: Flag) => new FrontendFlag(meetup)),
		};
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getOne(@Param('id') id: number) {
		const flag = await this.flagService.findBy({ id: id });

		return new FrontendFlag(flag);
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() createFlagDto: CreateFlagDto) {
		const createdFlag = await this.flagService.create(createFlagDto);

		return new FrontendFlag(createdFlag);
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(
		@Param('id')
		id: number,
		@Body() flagOptions: FlagOptions,
	) {
		const updatedFlag = await this.flagService.update(id, flagOptions);

		return new FrontendFlag(updatedFlag);
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: number) {
		await this.flagService.delete(id);

		return `Flag deleted successfully`;
	}
}
