import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Res,
} from '@nestjs/common';
import { Response } from 'express';

import { MeetupService } from '../domain/meetup.service';
import { MeetupDto } from '../presentation/meetup.dto';

@Controller('meetup')
export class MeetupController {
	constructor(readonly meetupService: MeetupService) {}

	@Get()
	async getAll(@Res() res: Response) {
		const meetups = await this.meetupService.findAll({});

		res.status(HttpStatus.OK).send(meetups);
	}

	@Get(':id')
	async getOne(@Param('id') id: number, @Res() res: Response) {
		const meetups = await this.meetupService.findBy({ id: id });

		res.status(HttpStatus.OK).send(meetups);
	}

	@Post()
	async create(@Body() meetupDto: MeetupDto, @Res() res: Response) {
		const meetup = await this.meetupService.create(meetupDto);

		res.status(HttpStatus.OK).send({
			message: `Meetup ${meetup.title} created successfully`,
		});
	}

	@Delete(':id')
	async delete(@Param('id') id: number, @Res() res: Response) {
		await this.meetupService.delete(id);

		res.status(HttpStatus.OK).send({ message: `Meetup deleted successfully` });
	}
}
