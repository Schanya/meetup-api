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
	UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { TransactionInterceptor } from 'src/common/interseptors/transaction.interseptor';
import { ReadAllResult } from 'src/common/types/read-all.options';
import { User } from '../domain/user.entity';
import { UserService } from '../domain/user.service';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { ReadAllUserDto } from '../presentation/dto/read-all-user.dto';
import { UpdateUserDto } from '../presentation/dto/update-user.dto';
import { FrontendUser } from '../presentation/types/user.type';

@Controller('user')
export class UserController {
	constructor(readonly userService: UserService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(
		@Query() readAllUserDto: ReadAllUserDto,
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

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getOne(@Param('id') id: number) {
		const user = await this.userService.findOne({ id: id });

		return new FrontendUser(user);
	}

	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
		@TransactionParam() transaction: Transaction,
	) {
		const user = await this.userService.create(createUserDto, transaction);

		return new FrontendUser(user);
	}

	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(
		@Param('id')
		id: number,
		@Body() updateUserDto: UpdateUserDto,
		@TransactionParam() transaction: Transaction,
	) {
		const updatedUser = await this.userService.update(
			id,
			updateUserDto,
			transaction,
		);

		return new FrontendUser(updatedUser);
	}

	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	async delete(
		@Param('id') id: number,
		@TransactionParam() transaction: Transaction,
	) {
		await this.userService.delete(id, transaction);
	}
}
