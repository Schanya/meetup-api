import { Module } from '@nestjs/common/decorators';

import { FlagModule } from './flag/flag.module';
import { MeetupModule } from './meetup/meetup.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [MeetupModule, FlagModule, UserModule, RoleModule, AuthModule],
	controllers: [],
	providers: [],
})
export class CoreModule {}
