import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@MaxLength(255)
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	password?: string;
}
