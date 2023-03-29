import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { defaultPagination } from 'src/common/constants/pagination.constants';
import { defaultSorting } from 'src/common/constants/sorting.constants';
import { ReadAllResult } from 'src/common/types/read-all.options';
import { Role } from 'src/core/role/domain/role.entity';
import { RoleService } from 'src/core/role/domain/role.service';
import { IReadAllUserOptions } from '../infrastructure/read-all-user.interface';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { UserOptions } from '../presentation/dto/find-user.options';
import { UpdateUserDto } from '../presentation/dto/update-user.dto';
import { User } from './user.entity';
import { UserFiltration } from './user.filter';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RoleService,
	) {}

	public async findOne(options: UserOptions): Promise<User> {
		const suitableUser = await this.findBy({ ...options });

		if (!suitableUser) {
			throw new BadRequestException("There isn't suitable user");
		}

		return suitableUser;
	}

	public async findAll(
		options: IReadAllUserOptions,
	): Promise<ReadAllResult<User>> {
		const pagination = options.pagination ?? defaultPagination;
		const sorting = options.sorting ?? defaultSorting;
		const filter = UserFiltration.getLikeFilters(options.filter);

		const { count, rows } = await this.userRepository.findAndCountAll({
			where: { ...filter.usersFilters },
			include: [
				{
					model: Role,
					all: true,
					where: filter.rolesFilters,
				},
			],
			distinct: true,
			limit: pagination.size,
			offset: pagination.offset,
			order: [[sorting.column, sorting.direction]],
		});

		for (let i = 0; i < rows.length; i++) {
			rows[i].roles = await rows[i].$get('roles');
		}

		return {
			totalRecordsNumber: count,
			entities: rows,
		};
	}

	public async findBy(options: UserOptions): Promise<User> {
		const suitableUser = await this.userRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableUser;
	}

	public async create(
		createUserDto: CreateUserDto,
		transaction: Transaction,
	): Promise<User> {
		const existingUser = await this.findBy({ email: createUserDto.email });

		if (existingUser) {
			throw new BadRequestException('Such user already exists');
		}

		const createdUser = await this.userRepository.create(createUserDto, {
			transaction,
		});

		const role = await this.roleService.findBy({ name: 'TEST' });
		await createdUser.$add('role', role, { transaction });

		await createdUser.save({ transaction });

		return createdUser;
	}

	public async update(
		id: number,
		updateUserDto: UpdateUserDto,
		transaction: Transaction,
	): Promise<User> {
		const existingUser = await this.findBy({ id: id });

		if (!existingUser) {
			throw new BadRequestException("Such user doesn't exist");
		}

		const sameUser = await this.findBy({ email: updateUserDto.email });

		if (sameUser) {
			throw new BadRequestException('Such user already exists');
		}

		const [numberUpdatedRows, updatedUsers] = await this.userRepository.update(
			updateUserDto,
			{
				where: { id },
				transaction,
				returning: true,
			},
		);

		return updatedUsers[0];
	}

	public async delete(id: number, transaction: Transaction): Promise<void> {
		const numberDeletedRows = await this.userRepository.destroy({
			where: { id },
			transaction,
		});

		if (!numberDeletedRows)
			throw new BadRequestException('There is no suitable user');
	}
}
