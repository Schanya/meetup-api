import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Flag } from 'src/core/flag/domain/flag.entity';

import { FlagService } from 'src/core/flag/domain/flag.service';

import { MeetupDto, MeetupOptions } from '../presentation/meetup.dto';
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

	public async findBy(options: MeetupOptions): Promise<Meetup> {
		const suitableMeetup = await this.meetupRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		if (!suitableMeetup) {
			throw new BadRequestException("There isn't suitable meetup");
		}

		return suitableMeetup;
	}

	public async create(meetupDto: MeetupDto): Promise<Meetup> {
		// const existingMeetup = await this.findBy({ title: meetupDto.title }); Should title be uniq?

		// if (existingMeetup) {
		// 	throw new BadRequestException('Such meetup has already exist');
		// }

		let meetupDtoWithoutFlags = { ...meetupDto };
		delete meetupDtoWithoutFlags.flags;

		const createdMeetup = await this.meetupRepository.create(
			meetupDtoWithoutFlags,
		);

		let flags: Flag[] = [];
		for await (const flag of meetupDto.flags) {
			const existingFlag = await this.flagService.findBy({
				name: flag,
			});

			if (!existingFlag) {
				const createdFlag = await this.flagService.create({
					name: flag,
				});

				await createdMeetup.$add('flags', createdFlag);

				flags.push(createdFlag);
			} else {
				await createdMeetup.$add('flags', existingFlag);

				flags.push(existingFlag);
			}
		}

		createdMeetup.flags = flags;

		await createdMeetup.save();

		return createdMeetup;
	}

	public async delete(id: number): Promise<number> {
		const numberDeletedRows = await this.meetupRepository.destroy({
			where: { id },
		});

		if (!numberDeletedRows)
			throw new BadRequestException('There is no suitable meetup');

		return numberDeletedRows;
	}
}
