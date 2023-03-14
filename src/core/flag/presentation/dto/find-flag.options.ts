import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class FlagOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;
}
