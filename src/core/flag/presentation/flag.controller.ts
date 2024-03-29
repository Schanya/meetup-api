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
	UseGuards,
} from '@nestjs/common';

import {
	ApiCookieAuth,
	ApiExtraModels,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import {
	createFlagLinksOptions,
	getAllFlagSchemaOptions,
} from 'src/core/swagger/flag.options';

import { ReadAllResult } from 'src/common/types/read-all.options';
import { FlagService } from '../application/flag.service';
import { CreateFlagDto } from '../domain/dto/create-flag.dto';
import { UpdateFlagDto } from '../domain/dto/update-flag.dto';
import { ReadAllFlagDto } from '../domain/dto/read-all-flag.dto';
import { Flag } from '../domain/flag.entity';

import { Roles } from 'src/common/decorators/role.decorator';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { JwtAuthGuard } from 'src/core/auth/domain/guards/jwt.guard';
import { RolesGuard } from 'src/core/auth/domain/guards/role.guard';
import { CreateFlagSchema } from '../domain/schemas/create-flag.schema';
import { FrontendFlag } from '../domain/types/flag.type';
import { UpdateFlagSchema } from '../domain/schemas/update-flag.schema';
import { ReadAllFlagSchema } from '../domain/schemas/read-all-flag.schema';

@ApiTags('Flag')
@ApiExtraModels(ReadAllFlagDto, BaseReadAllDto)
@ApiCookieAuth()
@Controller('flag')
@Roles('ADMIN', 'USER', 'TEST')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FlagController {
	constructor(readonly flagService: FlagService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get all suitable flags for the user' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		schema: getAllFlagSchemaOptions,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async getAll(
		@Query(new JoiValidationPipe(ReadAllFlagSchema))
		readAllFlagDto: ReadAllFlagDto,
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

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get the suitable flag by id for the user' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: FrontendFlag,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async getOne(@Param('id') id: number) {
		const flag = await this.flagService.findOne({ id: id });

		return new FrontendFlag(flag);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new flag for the user' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Success',
		type: FrontendFlag,
		links: createFlagLinksOptions,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async create(
		@Body(new JoiValidationPipe(CreateFlagSchema)) createFlagDto: CreateFlagDto,
	) {
		const createdFlag = await this.flagService.create(createFlagDto);

		return new FrontendFlag(createdFlag);
	}

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Update flag by id for the user' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: FrontendFlag,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async update(
		@Param('id') id: number,
		@Body(new JoiValidationPipe(UpdateFlagSchema)) flagOptions: UpdateFlagDto,
	) {
		const updatedFlag = await this.flagService.update(id, flagOptions);

		return new FrontendFlag(updatedFlag);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete flag by id for the user' })
	@ApiResponse({
		status: HttpStatus.NO_CONTENT,
		description: 'Success',
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async delete(@Param('id') id: number) {
		await this.flagService.delete(id);
	}
}
