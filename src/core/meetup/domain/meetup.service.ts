import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FlagService } from 'src/core/flag/domain/flag.service';

import { MeetupOptions } from '../presentation/meetup.dto';
import { Meetup } from './meetup.entity';

@Injectable()
export class MeetupService {
	constructor(
		@InjectModel(Meetup) private meetupRepository: typeof Meetup,
		private flagService: FlagService,
	) {}

	public async findAll(options: MeetupOptions): Promise<Meetup[]> {
		const suitableMeetups = await this.meetupRepository.findAll({
			where: { ...options },
			include: { all: true },
		});

		return suitableMeetups;
	}
}
