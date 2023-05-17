import {
	Request,
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
	UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';

import { ReadAllResult } from 'src/common/types/read-all.options';

import { Meetup } from '../domain/meetup.entity';
import { MeetupService } from '../application/meetup.service';
import { FrontendMeetup } from '../domain/types/meetup.type';

import { CreateMeetupDto } from '../domain/dto/create-meetup.dto';
import { ReadAllMeetupDto } from '../domain/dto/read-all-meetup.dto';
import { UpdateMeetupDto } from '../domain/dto/update-meetup.dto';

import { Roles } from 'src/common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/core/auth/domain/guards/jwt.guard';
import { RolesGuard } from 'src/core/auth/domain/guards/role.guard';
import { UserParam } from 'src/common/decorators/user.decorator';
import { PayloadDto } from 'src/core/auth/domain/dto/payload.dto';
import {
	ApiCookieAuth,
	ApiExtraModels,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';
import {
	createMeetupLinksOptions,
	getAllMeetupSchemaOptions,
} from 'src/core/swagger/meetup.options';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { ReadAllMeetupSchema } from '../domain/schemas/read-all-meetup.schema';
import { CreateMeetupSchema } from '../domain/schemas/create-meetup.schema';
import { UpdateMeetupSchema } from '../domain/schemas/update-meetup.schema';
import { PayloadSchema } from 'src/core/auth/domain/schemas/payload.schema';

@ApiTags('Meetup')
@ApiExtraModels(ReadAllMeetupDto, BaseReadAllDto, PayloadDto)
@ApiCookieAuth()
@Controller('meetup')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MeetupController {
	constructor(readonly meetupService: MeetupService) {}

	@Post('register-for-meetup/:id')
	@Roles('ADMIN', 'USER')
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Registration for the meetup' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Success',
		type: FrontendMeetup,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	public async joinToMeetup(
		@UserParam(new JoiValidationPipe(PayloadSchema)) user: PayloadDto,
		@Param('id') meetupId: number,
		@TransactionParam() transaction: Transaction,
	): Promise<FrontendMeetup> {
		const meetup = await this.meetupService.registerForMeetup(
			user.id,
			meetupId,
			transaction,
		);

		return new FrontendMeetup(meetup);
	}

	@Post('unregister-for-meetup/:id')
	@Roles('ADMIN', 'USER')
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Unregistration for the meetup' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Success',
		type: FrontendMeetup,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	public async leaveFromMeetup(
		@UserParam(new JoiValidationPipe(PayloadSchema)) user: PayloadDto,
		@Param('id') meetupId: number,
		@TransactionParam() transaction: Transaction,
	): Promise<FrontendMeetup> {
		const meetup = await this.meetupService.unregisterForMeetup(
			user.id,
			meetupId,
			transaction,
		);
		return new FrontendMeetup(meetup);
	}

	@Get()
	@Roles('ADMIN', 'USER')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get all suitable meetups for the user' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		schema: getAllMeetupSchemaOptions,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async getAll(
		@Query(new JoiValidationPipe(ReadAllMeetupSchema))
		readAllMeetupDto: ReadAllMeetupDto,
	): Promise<ReadAllResult<FrontendMeetup>> {
		const { pagination, sorting, ...filter } = readAllMeetupDto;

		const meetups = await this.meetupService.findAll({
			pagination,
			sorting,
			filter,
		});

		return {
			totalRecordsNumber: meetups.totalRecordsNumber,
			entities: meetups.entities.map(
				(meetup: Meetup) => new FrontendMeetup(meetup),
			),
		};
	}

	@Get(':id')
	@Roles('ADMIN', 'USER')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get the suitable meetup by id for the user' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: FrontendMeetup,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async getOne(@Param('id') id: number) {
		const meetup = await this.meetupService.findOne({ id: id });

		return new FrontendMeetup(meetup);
	}

	@Post()
	@Roles('ADMIN')
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new meetup for the user' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Success',
		type: FrontendMeetup,
		links: createMeetupLinksOptions,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async create(
		@UserParam() user: PayloadDto,
		@Body(new JoiValidationPipe(CreateMeetupSchema))
		createMeetupDto: CreateMeetupDto,
		@TransactionParam() transaction: Transaction,
	) {
		const meetup = await this.meetupService.create(
			createMeetupDto,
			transaction,
			user.id,
		);

		return new FrontendMeetup(meetup);
	}

	@Put(':id')
	@Roles('ADMIN')
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Update meetup by id for the user' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: FrontendMeetup,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async update(
		@Param('id')
		id: number,
		@Body(new JoiValidationPipe(UpdateMeetupSchema))
		updateMeetupDto: UpdateMeetupDto,
		@TransactionParam() transaction: Transaction,
	) {
		const updatedMeetup = await this.meetupService.update(
			id,
			updateMeetupDto,
			transaction,
		);

		return new FrontendMeetup(updatedMeetup);
	}

	@Delete(':id')
	@Roles('ADMIN')
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete meetup by id for the user' })
	@ApiResponse({
		status: HttpStatus.NO_CONTENT,
		description: 'Success',
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async delete(
		@Param('id') id: number,
		@TransactionParam() transaction: Transaction,
	) {
		await this.meetupService.delete(id, transaction);
	}
}
