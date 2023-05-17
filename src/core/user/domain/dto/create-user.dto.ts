import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		description: 'User email',
		example: 'test@gmail.com',
		required: true,
		nullable: false,
	})
	@IsNotEmpty()
	@MaxLength(255)
	@IsEmail()
	email: string;

	@ApiProperty({
		description: "User's password",
		example: 'test',
		required: true,
		nullable: false,
	})
	@IsNotEmpty()
	@IsString()
	password: string;
}
