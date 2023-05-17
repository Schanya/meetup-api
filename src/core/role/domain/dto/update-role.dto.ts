import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
	@ApiProperty({
		description: 'Role name',
		example: 'EXAMPLE',
		required: false,
	})
	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;
}
