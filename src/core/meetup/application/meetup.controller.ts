import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { MeetupService } from '../domain/meetup.service';

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
}
