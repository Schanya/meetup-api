import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';

import { AuthService } from '../application/auth.service';

import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';
import { CreateUserDto } from 'src/core/user/domain/dto/create-user.dto';
import { LocalAuthGuard } from '../domain/guards/local.guard';

import { AuthGuard } from '@nestjs/passport';
import {
	ApiExtraModels,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { SecretData } from '../domain/secret-date.dto';
import { User } from 'src/core/user/domain/user.entity';

@ApiTags('Auth')
@ApiExtraModels(SecretData)
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('sign-in')
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'User login' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: SecretData,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async login(@Body() createUserDto: CreateUserDto, @Req() req) {
		const secretData = await this.authService.login(createUserDto);

		req.res.cookie(
			'auth-cookie',
			secretData,
			{ httpOnly: true },
			{ passthrough: true },
		);
		return secretData;
	}

	@Post('sign-up')
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'User registration' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
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

	@Get('refresh-tokens')
	@UseGuards(AuthGuard('refresh'))
	@ApiOperation({ summary: 'Get refresh token	' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: SecretData,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async regenerateTokens(@Req() req) {
		const secretData = await this.authService.refresh(req.user);

		req.res.cookie(
			'auth-cookie',
			secretData,
			{ httpOnly: true },
			{ passthrough: true },
		);
		return secretData;
	}
}
