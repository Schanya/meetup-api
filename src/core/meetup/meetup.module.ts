import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Meetup } from './domain/meetup.entity';
import { MeetupController } from './application/meetup.controller';
import { MeetupService } from './domain/meetup.service';

@Module({
	imports: [SequelizeModule.forFeature([Meetup])],
	controllers: [MeetupController],
	providers: [MeetupService],
	exports: [MeetupService],
})
export class MeetupModule {}
