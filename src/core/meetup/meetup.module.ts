import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FlagModule } from '../flag/flag.module';

import { Meetup } from './domain/meetup.entity';
import { MeetupController } from './application/meetup.controller';
import { MeetupService } from './domain/meetup.service';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';
import { Sequelize } from 'sequelize-typescript';

@Module({
	imports: [SequelizeModule.forFeature([Meetup]), FlagModule],
	controllers: [MeetupController],
	providers: [
		MeetupService,
		TransactionInterceptor,
		{ provide: 'SEQUELIZE', useExisting: Sequelize },
	],
	exports: [
		MeetupService,
		TransactionInterceptor,
		{ provide: 'SEQUELIZE', useExisting: Sequelize },
	],
})
export class MeetupModule {}
