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

import { MeetupService } from '../domain/meetup.service';
import { MeetupDto, MeetupOptions } from '../presentation/meetup.dto';

@Controller('meetup')
export class MeetupController {
	constructor(readonly meetupService: MeetupService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll() {
		const meetups = await this.meetupService.findAll({});

		return meetups;
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getOne(@Param('id') id: number) {
		const meetup = await this.meetupService.findBy({ id: id });

		return meetup;
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() meetupDto: MeetupDto) {
		const meetup = await this.meetupService.create(meetupDto);

		return `Meetup ${meetup.title} created successfully`;
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(
		@Param('id')
		id: number,
		@Body() meetupOptions: MeetupOptions,
	) {
		const updatedMeetup = await this.meetupService.update(id, meetupOptions);

		return `Meetup ${updatedMeetup.title} updated successfully`;
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: number) {
		await this.meetupService.delete(id);

		return `Meetup deleted successfully`;
	}
}
