import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;
}
