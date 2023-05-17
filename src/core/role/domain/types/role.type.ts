import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role.entity';

export class FrontendRole {
	@ApiProperty({ description: 'Role identifier', example: 1 })
	public id: number;
	@ApiProperty({ description: 'Role name', example: 'EXAMPLE' })
	public name: string;

	constructor(role: Role) {
		this.id = role.id;
		this.name = role.name;
	}
}
