import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FlagModule } from '../flag/flag.module';

import { Meetup } from './domain/meetup.entity';
import { MeetupController } from './presentation/meetup.controller';
import { MeetupService } from './application/meetup.service';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';
import { Sequelize } from 'sequelize-typescript';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [SequelizeModule.forFeature([Meetup]), FlagModule, UserModule],
	controllers: [MeetupController],
	providers: [
		MeetupService,
		TransactionInterceptor,
		{ provide: 'SEQUELIZE', useExisting: Sequelize },
	],
	exports: [MeetupService],
})
export class MeetupModule {}
