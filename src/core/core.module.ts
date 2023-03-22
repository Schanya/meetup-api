import { Module } from '@nestjs/common/decorators';

import { FlagModule } from './flag/flag.module';
import { MeetupModule } from './meetup/meetup.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [MeetupModule, FlagModule, UserModule],
	controllers: [],
	providers: [],
})
export class CoreModule {}
