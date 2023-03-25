import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';

import { UserController } from './application/user.controller';
import { User } from './domain/user.entity';
import { UserService } from './domain/user.service';

@Module({
	imports: [SequelizeModule.forFeature([User])],
	controllers: [UserController],
	providers: [
		UserService,
		TransactionInterceptor,
		{ provide: 'SEQUELIZE', useExisting: Sequelize },
	],
	exports: [
		UserService,
		TransactionInterceptor,
		{ provide: 'SEQUELIZE', useExisting: Sequelize },
	],
})
export class UserModule {}
