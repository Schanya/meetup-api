import {
	IsString,
	IsNotEmpty,
	MaxLength,
	IsInt,
	IsOptional,
} from 'class-validator';

export class FlagDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}

export class FlagOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;
}
