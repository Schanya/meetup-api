import { Module } from '@nestjs/common/decorators';

import { FlagModule } from './flag/flag.module';
import { MeetupModule } from './meetup/meetup.module';

@Module({
	imports: [MeetupModule, FlagModule],
	controllers: [],
	providers: [],
})
export class CoreModule {}
