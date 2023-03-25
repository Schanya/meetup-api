import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}
