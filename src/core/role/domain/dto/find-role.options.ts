import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class RoleOptions {
	@ApiProperty({ description: 'Role identifier', example: 1, required: false })
	@IsOptional()
	@IsInt()
	id?: number;

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
