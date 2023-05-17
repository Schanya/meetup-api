import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
	@ApiProperty({
		description: "User's email",
		example: 'test@gmail.com',
		required: false,
	})
	@IsOptional()
	@MaxLength(255)
	@IsEmail()
	email?: string;

	@ApiProperty({
		description: "User's password",
		example: 'test',
		required: false,
	})
	@IsOptional()
	@IsString()
	password?: string;
}
