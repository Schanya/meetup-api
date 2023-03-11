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
	UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';

import { MeetupService } from '../domain/meetup.service';
import { MeetupDto, MeetupOptions } from '../presentation/meetup.dto';
import { FrontendMeetup } from '../presentation/meetup.type';

@Controller('meetup')
export class MeetupController {
	constructor(readonly meetupService: MeetupService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(): Promise<FrontendMeetup[]> {
		const meetups = await this.meetupService.findAll({});

		return meetups.map((meetup) => new FrontendMeetup(meetup));
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getOne(@Param('id') id: number) {
		const meetup = await this.meetupService.findBy({ id: id });

		return new FrontendMeetup(meetup);
	}

	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(
		@Body() meetupDto: MeetupDto,
		@TransactionParam() transaction: Transaction,
	) {
		const meetup = await this.meetupService.create(meetupDto, transaction);

		return new FrontendMeetup(meetup);
	}

	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(
		@Param('id')
		id: number,
		@Body() meetupOptions: MeetupOptions,
		@TransactionParam() transaction: Transaction,
	) {
		const updatedMeetup = await this.meetupService.update(
			id,
			meetupOptions,
			transaction,
		);

		return new FrontendMeetup(updatedMeetup);
	}

	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(
		@Param('id') id: number,
		@TransactionParam() transaction: Transaction,
	) {
		await this.meetupService.delete(id, transaction);

		return `Meetup deleted successfully`;
	}
}
