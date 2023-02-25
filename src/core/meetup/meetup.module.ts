import { Module } from '@nestjs/common';
import { MeetupController } from './application/meetup.controller';
import { MeetupService } from './domain/meetup.service';

@Module({
	imports: [],
	controllers: [MeetupController],
	providers: [MeetupService],
	exports: [MeetupService],
})
export class MeetupModule {}
