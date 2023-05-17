import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFlagDto {
	@ApiProperty({
		description: 'Flag name',
		example: 'Test',
		nullable: false,
		required: true,
	})
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}
