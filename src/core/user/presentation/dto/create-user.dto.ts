import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
