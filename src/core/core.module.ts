import { Module } from '@nestjs/common/decorators';
import { MeetupModule } from './meetup/meetup.module';

@Module({
	imports: [MeetupModule],
	controllers: [],
	providers: [],
})
export class CoreModule {}
