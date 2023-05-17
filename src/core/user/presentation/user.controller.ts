import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import {
	ApiCookieAuth,
	ApiExtraModels,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';
import { ReadAllResult } from 'src/common/types/read-all.options';
import {
	createUserLinksOptions,
	getAllUserSchemaOptions,
} from 'src/core/swagger/user.options';
import { UserService } from '../application/user.service';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { ReadAllUserDto } from '../domain/dto/read-all-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { FrontendUser } from '../domain/types/user.type';
import { User } from '../domain/user.entity';
import { Roles } from 'src/common/decorators/role.decorator';
import { JwtAuthGuard } from 'src/core/auth/domain/guards/jwt.guard';
import { RolesGuard } from 'src/core/auth/domain/guards/role.guard';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { ReadAllUserSchema } from '../domain/schemas/read-all-user.schema';
import { CreateUserSchema } from '../domain/schemas/create-user.schema';
import { UpdateUserSchema } from '../domain/schemas/update-user.schema';

@ApiTags('User')
@ApiExtraModels(ReadAllUserDto, BaseReadAllDto)
@ApiCookieAuth()
@Controller('user')
@Roles('ADMIN', 'TEST')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
	constructor(readonly userService: UserService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get all suitable users ' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		schema: getAllUserSchemaOptions,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async getAll(
		@Query(new JoiValidationPipe(ReadAllUserSchema))
		readAllUserDto: ReadAllUserDto,
	): Promise<ReadAllResult<FrontendUser>> {
		const { pagination, sorting, ...filter } = readAllUserDto;

		const users = await this.userService.findAll({
			pagination,
			sorting,
			filter,
		});

		return {
			totalRecordsNumber: users.totalRecordsNumber,
			entities: users.entities.map((user: User) => new FrontendUser(user)),
		};
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get the suitable user by id ' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: FrontendUser,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async getOne(@Param('id') id: number) {
		const user = await this.userService.findOne({ id: id });

		return new FrontendUser(user);
	}

	@Post()
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new user' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Success',
		type: FrontendUser,
		links: createUserLinksOptions,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async create(
		@Body(new JoiValidationPipe(CreateUserSchema)) createUserDto: CreateUserDto,
		@TransactionParam() transaction: Transaction,
	) {
		const user = await this.userService.create(createUserDto, transaction);

		return new FrontendUser(user);
	}

	@Put(':id')
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Update user by id' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: FrontendUser,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async update(
		@Param('id')
		id: number,
		@Body(new JoiValidationPipe(UpdateUserSchema)) updateUserDto: UpdateUserDto,
		@TransactionParam() transaction: Transaction,
	) {
		const updatedUser = await this.userService.update(
			id,
			updateUserDto,
			transaction,
		);

		return new FrontendUser(updatedUser);
	}

	@Delete(':id')
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete user by id ' })
	@ApiResponse({
		status: HttpStatus.NO_CONTENT,
		description: 'Success',
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async delete(
		@Param('id') id: number,
		@TransactionParam() transaction: Transaction,
	) {
		await this.userService.delete(id, transaction);
	}
}
