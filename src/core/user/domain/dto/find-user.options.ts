import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, MaxLength } from 'class-validator';

export class UserOptions {
	@ApiProperty({
		description: 'User identifier',
		example: 1,
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsInt()
	id?: number;

	@ApiProperty({
		description: 'User email',
		example: 'test@gmail.com',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@MaxLength(255)
	@IsEmail()
	email?: string;
}
