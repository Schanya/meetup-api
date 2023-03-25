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
} from '@nestjs/common';
import { ReadAllResult } from 'src/common/types/read-all.options';
import { Role } from '../domain/role.entity';
import { RoleService } from '../domain/role.service';
import { CreateRoleDto } from '../presentation/dto/create-role.dto';
import { ReadAllRoleDto } from '../presentation/dto/read-all-role.dto';
import { UpdateRoleDto } from '../presentation/dto/update-role.dto';
import { FrontendRole } from '../presentation/types/role.type';

@Controller('role')
export class RoleController {
	constructor(readonly roleService: RoleService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(
		@Query() readAllRoleDto: ReadAllRoleDto,
	): Promise<ReadAllResult<FrontendRole>> {
		const { pagination, sorting, ...filter } = readAllRoleDto;

		const roles = await this.roleService.findAll({
			pagination,
			sorting,
			filter,
		});

		return {
			totalRecordsNumber: roles.totalRecordsNumber,
			entities: roles.entities.map((role: Role) => new FrontendRole(role)),
		};
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async getOne(@Param('id') id: number) {
		const role = await this.roleService.findBy({ id: id });

		return new FrontendRole(role);
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() createRoleDto: CreateRoleDto) {
		const createdRole = await this.roleService.create(createRoleDto);

		return new FrontendRole(createdRole);
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(
		@Param('id')
		id: number,
		@Body() updateRoleDto: UpdateRoleDto,
	) {
		const updatedRole = await this.roleService.update(id, updateRoleDto);

		return new FrontendRole(updatedRole);
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: number) {
		await this.roleService.delete(id);

		return `Role deleted successfully`;
	}
}
