import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/core/role/domain/role.entity';

export class PayloadDto {
	@ApiProperty({
		description: 'User identifier',
		example: 1,
		required: true,
		nullable: false,
	})
	id: number;

	@ApiProperty({
		description: "User's email",
		example: 'test@gmail.com',
		required: true,
		nullable: false,
	})
	email: string;

	@ApiProperty({
		description: "User's roles",
		example: ['ADMIN', 'USER'],
		type: [Role],
		required: true,
		nullable: false,
	})
	roles: Role[];
}
