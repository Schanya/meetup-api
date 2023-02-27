import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
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
}
