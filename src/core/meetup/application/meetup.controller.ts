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
import { MeetupService } from '../domain/meetup.service';
import { FrontendMeetup } from '../presentation/types/meetup.type';

import { CreateMeetupDto } from '../presentation/dto/create-meetup.dto';
import { ReadAllMeetupDto } from '../presentation/dto/read-all-meetup.dto';
import { UpdateMeetupDto } from '../presentation/dto/update-meetup.dto';

import { Roles } from 'src/common/interseptors/role.decorator';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt.guard';
import { RolesGuard } from 'src/core/auth/guards/role.guard';
import { UserParam } from 'src/common/decorators/user.decorator';
import { PayloadDto } from 'src/core/auth/presentation/payload.dto';

@Controller('meetup')
export class MeetupController {
	constructor(readonly meetupService: MeetupService) {}

	@Roles('ADMIN', 'USER', 'TEST')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.CREATED)
	@Post('register-for-meetup/:id')
	public async joinToMeetup(
		@UserParam() user: PayloadDto,
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

	@Roles('ADMIN', 'USER', 'TEST')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.CREATED)
	@Post('unregister-for-meetup/:id')
	public async leaveFromMeetup(
		@UserParam() user: PayloadDto,
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

	@Roles('ADMIN', 'USER', 'TEST')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(
		@Query() readAllMeetupDto: ReadAllMeetupDto,
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

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getOne(@Param('id') id: number) {
		const meetup = await this.meetupService.findOne({ id: id });

		return new FrontendMeetup(meetup);
	}

	@Roles('ADMIN', 'USER', 'TEST')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(
		@UserParam() user: PayloadDto,
		@Body() createMeetupDto: CreateMeetupDto,
		@TransactionParam() transaction: Transaction,
	) {
		const meetup = await this.meetupService.create(
			createMeetupDto,
			transaction,
			user.id,
		);

		return new FrontendMeetup(meetup);
	}

	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(
		@Param('id')
		id: number,
		@Body() updateMeetupDto: UpdateMeetupDto,
		@TransactionParam() transaction: Transaction,
	) {
		const updatedMeetup = await this.meetupService.update(
			id,
			updateMeetupDto,
			transaction,
		);

		return new FrontendMeetup(updatedMeetup);
	}

	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	async delete(
		@Param('id') id: number,
		@TransactionParam() transaction: Transaction,
	) {
		await this.meetupService.delete(id, transaction);
	}
}
