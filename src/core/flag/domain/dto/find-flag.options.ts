import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class FlagOptions {
	@ApiProperty({ description: 'Flag identifier', example: 1, required: false })
	@IsOptional()
	@IsInt()
	id?: number;

	@ApiProperty({ description: 'Flag name', example: 'Test', required: false })
	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;
}
