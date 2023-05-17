import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/core/role/domain/role.entity';

export class PayloadDto {
	@ApiProperty({
		description: 'User identifier',
		example: 1,
		required: true,
		nullable: false,
	})
	@IsNotEmpty()
	@IsString()
	id: number;

	@ApiProperty({
		description: "User's email",
		example: 'test@gmail.com',
		required: true,
		nullable: false,
	})
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty({
		description: "User's roles",
		example: ['ADMIN', 'USER'],
		type: [Role],
		required: true,
		nullable: false,
	})
	@IsNotEmpty()
	@IsArray()
	roles: Role[];
}
