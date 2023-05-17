import { ApiProperty } from '@nestjs/swagger';
import { FrontendRole } from 'src/core/role/domain/types/role.type';
import { User } from '../user.entity';

class Role {
	@ApiProperty({ description: 'Role identifier', example: 1 })
	id: number;

	@ApiProperty({ description: 'Role name', example: 'ADMIN' })
	name: string;
}

export class FrontendUser {
	@ApiProperty({ description: 'User identifier', example: 1 })
	public id: number;
	@ApiProperty({ description: "User's email", example: 'test@gmail.com' })
	public email: string;
	@ApiProperty({
		description: "User's roles",
		example: ['ADMIN', 'TEST'],
		type: [Role],
	})
	public roles: Role[];

	constructor(user: User) {
		this.id = user.id;
		this.email = user.email;
		this.roles = user.roles.map((role) => ({
			id: role.id,
			name: role.name,
		}));
	}
}
