import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';

import { AuthService } from '../domain/auth.service';

import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';
import { CreateUserDto } from 'src/core/user/presentation/dto/create-user.dto';
import { LocalAuthGuard } from '../guards/local.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	async login(@Body() createUserDto: CreateUserDto) {
		const token = await this.authService.login(createUserDto);

		return token;
	}

	@HttpCode(HttpStatus.OK)
	@UseInterceptors(TransactionInterceptor)
	@Post('sign-up')
	async registration(
		@Body() createUserDto: CreateUserDto,
		@TransactionParam() transaction: Transaction,
	) {
		const user = await this.authService.registration(
			createUserDto,
			transaction,
		);

		return user;
	}
}
