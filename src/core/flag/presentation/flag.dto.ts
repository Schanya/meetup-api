import {
	IsString,
	IsNotEmpty,
	MaxLength,
	IsInt,
	IsOptional,
	IsDefined,
} from 'class-validator';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';

export class FlagDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}

export class ReadAllFlagDto extends BaseReadAllDto {
	@IsOptional()
	@IsDefined()
	@IsString()
	public name?: string;
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
