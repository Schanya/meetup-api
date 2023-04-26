import { IsEmail, IsInt, IsOptional, MaxLength } from 'class-validator';

export class UserOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@MaxLength(255)
	@IsEmail()
	email?: string;
}
