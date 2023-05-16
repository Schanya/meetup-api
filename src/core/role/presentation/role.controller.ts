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
import { RoleService } from '../application/role.service';
import { CreateRoleDto } from '../domain/dto/create-role.dto';
import { ReadAllRoleDto } from '../domain/dto/read-all-role.dto';
import { UpdateRoleDto } from '../domain/dto/update-role.dto';
import { FrontendRole } from '../domain/types/role.type';
import {
	ApiExtraModels,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';
import {
	createRoleLinksOptions,
	getAllRoleSchemaOptions,
} from 'src/core/swagger/role.options';

@ApiTags('Role')
@ApiExtraModels(ReadAllRoleDto, BaseReadAllDto)
@Controller('role')
// @Roles('ADMIN', 'TEST')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController {
	constructor(readonly roleService: RoleService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get all suitable roles for the user' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		schema: getAllRoleSchemaOptions,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
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

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get the suitable role by id for the user' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: FrontendRole,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async getOne(@Param('id') id: number) {
		const role = await this.roleService.findOne({ id: id });

		return new FrontendRole(role);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new role for the user' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Success',
		type: FrontendRole,
		links: createRoleLinksOptions,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async create(@Body() createRoleDto: CreateRoleDto) {
		const createdRole = await this.roleService.create(createRoleDto);

		return new FrontendRole(createdRole);
	}

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Update role by id for the user' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Success',
		type: FrontendRole,
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async update(
		@Param('id')
		id: number,
		@Body() updateRoleDto: UpdateRoleDto,
	) {
		const updatedRole = await this.roleService.update(id, updateRoleDto);

		return new FrontendRole(updatedRole);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete role by id for the user' })
	@ApiResponse({
		status: HttpStatus.NO_CONTENT,
		description: 'Success',
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async delete(@Param('id') id: number) {
		await this.roleService.delete(id);
	}
}
