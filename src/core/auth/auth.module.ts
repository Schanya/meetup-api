import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';

import { Sequelize } from 'sequelize-typescript';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';

import { UserModule } from '../user/user.module';
import { AuthController } from './application/auth.controller';
import { AuthService } from './domain/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.ACCESS_TOKEN_SECRET,
			signOptions: { expiresIn: '3600s' },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		TransactionInterceptor,
		{ provide: 'SEQUELIZE', useExisting: Sequelize },
	],
	exports: [
		AuthService,
		JwtModule,
		LocalStrategy,
		JwtStrategy,
		TransactionInterceptor,
		{ provide: 'SEQUELIZE', useExisting: Sequelize },
	],
})
export class AuthModule {}