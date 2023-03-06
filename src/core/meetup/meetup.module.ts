import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FlagModule } from '../flag/flag.module';

import { Meetup } from './domain/meetup.entity';
import { MeetupController } from './application/meetup.controller';
import { MeetupService } from './domain/meetup.service';

@Module({
	imports: [SequelizeModule.forFeature([Meetup]), FlagModule],
	controllers: [MeetupController],
	providers: [MeetupService],
	exports: [MeetupService],
})
export class MeetupModule {}
