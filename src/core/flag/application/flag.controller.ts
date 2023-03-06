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
} from '@nestjs/common';
import { FlagService } from '../domain/flag.service';
import { FlagDto, FlagOptions } from '../presentation/flag.dto';

@Controller('flag')
export class FlagController {
	constructor(readonly flagService: FlagService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll() {
		const flags = await this.flagService.findAll({});

		return flags;
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getOne(@Param('id') id: number) {
		const flag = await this.flagService.findBy({ id: id });

		return flag;
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() flagDto: FlagDto) {
		const flag = await this.flagService.create(flagDto);

		return `Flag ${flag.name} created successfully`;
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(
		@Param('id')
		id: number,
		@Body() flagOptions: FlagOptions,
	) {
		const updatedFlag = await this.flagService.update(id, flagOptions);

		return `Flag ${updatedFlag.name} updated successfully`;
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: number) {
		await this.flagService.delete(id);

		return `Flag deleted successfully`;
	}
}
