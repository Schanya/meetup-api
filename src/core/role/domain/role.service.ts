import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { defaultPagination } from 'src/common/constants/pagination.constants';
import { defaultSorting } from 'src/common/constants/sorting.constants';
import { ReadAllResult } from 'src/common/types/read-all.options';
import { IReadAllRoleOptions } from '../infrastructure/read-all-role.interface';
import { CreateRoleDto } from '../presentation/dto/create-role.dto';
import { RoleOptions } from '../presentation/dto/find-role.options';
import { UpdateRoleDto } from '../presentation/dto/update-role.dto';
import { Role } from './role.entity';
import { RoleFiltration } from './role.filter';

@Injectable()
export class RoleService {
	constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

	public async findAll(
		options: IReadAllRoleOptions,
	): Promise<ReadAllResult<Role>> {
		const pagination = options.pagination ?? defaultPagination;
		const sorting = options.sorting ?? defaultSorting;
		const filter = RoleFiltration.getLikeFilters(options.filter);

		const { count, rows } = await this.roleRepository.findAndCountAll({
			where: { ...filter.rolesFilters },
			include: { all: true },
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

	public async findBy(options: RoleOptions): Promise<Role> {
		const suitableRole = await this.roleRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableRole;
	}

	public async create(createRoleDto: CreateRoleDto): Promise<Role> {
		const existingRole = await this.findBy({ name: createRoleDto.name });

		if (existingRole) {
			throw new BadRequestException('Such role has already exist');
		}

		return await this.roleRepository.create(createRoleDto);
	}

	public async update(id: number, UpdateRoleDto: UpdateRoleDto): Promise<Role> {
		const existingRole = await this.findBy({ id: id });

		if (!existingRole) {
			throw new BadRequestException("Such role doesn't exist");
		}

		const sameRole = await this.findBy({ name: UpdateRoleDto.name });

		if (sameRole) {
			throw new BadRequestException('Such role already exists');
		}

		await this.roleRepository.update(UpdateRoleDto, { where: { id } });

		const updatedRole = await this.findBy({ id: id });

		return updatedRole;
	}

	public async delete(id: number): Promise<number> {
		const numberDeletedRows = await this.roleRepository.destroy({
			where: { id },
		});

		if (!numberDeletedRows)
			throw new BadRequestException('There is no suitable role');

		return numberDeletedRows;
	}
}
