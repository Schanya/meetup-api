import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';
import { RoleController } from './application/role.controller';
import { Role } from './domain/role.entity';
import { RoleService } from './domain/role.service';

@Module({
	imports: [SequelizeModule.forFeature([Role])],
	controllers: [RoleController],
	providers: [RoleService],
	exports: [RoleService],
})
export class RoleModule {}
