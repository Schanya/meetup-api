import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { defaultPagination } from 'src/common/constants/pagination.constants';
import { defaultSorting } from 'src/common/constants/sorting.constants';
import { ReadAllResult } from 'src/common/types/read-all.options';
import { IReadAllUserOptions } from '../infrastructure/read-all-user.interface';
import { CreateUserDto } from '../presentation/dto/create-user.dto';
import { UserOptions } from '../presentation/dto/find-user.options';
import { UpdateUserDto } from '../presentation/dto/update-user.dto';
import { User } from './user.entity';
import { UserFiltration } from './user.filter';

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	public async findAll(
		options: IReadAllUserOptions,
	): Promise<ReadAllResult<User>> {
		const pagination = options.pagination ?? defaultPagination;
		const sorting = options.sorting ?? defaultSorting;
		const filter = UserFiltration.getLikeFilters(options.filter);

		const { count, rows } = await this.userRepository.findAndCountAll({
			where: { ...filter.usersFilters },
			distinct: true,
			limit: pagination.size,
			offset: pagination.offset,
			order: [[sorting.column, sorting.direction]],
		});

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

		if (!suitableUser) {
			throw new BadRequestException("There isn't suitable user");
		}

		return suitableUser;
	}

	public async create(
		createUserDto: CreateUserDto,
		transaction: Transaction,
	): Promise<User> {
		const createdUser = await this.userRepository.create(createUserDto, {
			transaction,
		});

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

		await this.userRepository.update(updateUserDto, {
			where: { id },
			transaction,
			returning: true,
		});

		const updatedMeetup = await this.findBy({ id });

		return updatedMeetup;
	}

	public async delete(id: number, transaction: Transaction): Promise<number> {
		const numberDeletedRows = await this.userRepository.destroy({
			where: { id },
			transaction,
		});

		if (!numberDeletedRows)
			throw new BadRequestException('There is no suitable user');

		return numberDeletedRows;
	}
}