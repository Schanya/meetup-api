import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './application/user.controller';
import { User } from './domain/user.entity';
import { UserService } from './domain/user.service';

@Module({
	imports: [SequelizeModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
