import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
	@ApiProperty({
		description: 'Role name',
		example: 'EXAMPLE',
		required: true,
	})
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}
