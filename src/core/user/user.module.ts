import { Module } from '@nestjs/common';
import { RoleModule } from '../role/role.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';

import { UserController } from './presentation/user.controller';
import { User } from './domain/user.entity';
import { UserService } from './application/user.service';

@Module({
	imports: [SequelizeModule.forFeature([User]), RoleModule],
	controllers: [UserController],
	providers: [
		UserService,
		TransactionInterceptor,
		{ provide: 'SEQUELIZE', useExisting: Sequelize },
	],
	exports: [UserService],
})
export class UserModule {}
