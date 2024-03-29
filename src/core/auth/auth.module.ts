import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';

import { Sequelize } from 'sequelize-typescript';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';

import { UserModule } from '../user/user.module';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './application/auth.service';
import { JwtStrategy } from './domain/strategies/jwt.strategy';
import { LocalStrategy } from './domain/strategies/local.strategy';
import { RefreshStrategy } from './domain/strategies/refresh.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.ACCESS_TOKEN_SECRET,
			signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRED },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		RefreshStrategy,
		TransactionInterceptor,
		{ provide: 'SEQUELIZE', useExisting: Sequelize },
	],
	exports: [AuthService],
})
export class AuthModule {}
