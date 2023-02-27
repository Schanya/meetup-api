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

	private async flagArrayHandler(flags: string[]): Promise<Flag[]> {
		let resultFlags: Flag[] = [];

		for await (const flag of flags) {
			const existingFlag = await this.flagService.findBy({
				name: flag,
			});

			resultFlags.push(
				!existingFlag
					? await this.flagService.create({
							name: flag,
					  })
					: existingFlag,
			);
		}

		return resultFlags;
	}

	public async create(meetupDto: MeetupDto): Promise<Meetup> {
		// const existingMeetup = await this.findBy({ title: meetupDto.title }); Should title be uniq?

		// if (existingMeetup) {
		// 	throw new BadRequestException('Such meetup has already exist');
		// }

		const resultFlags = await this.flagArrayHandler(meetupDto.flags);

		const { flags, ...rest } = meetupDto;

		const createdMeetup = await this.meetupRepository.create(meetupDto);

		for await (const flag of resultFlags) {
			await createdMeetup.$add('flags', flag);
		}

		createdMeetup.flags = resultFlags;

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
