import { Transform } from 'class-transformer';
import {
	IsArray,
	IsDate,
	IsDefined,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';

export class ReadAllMeetupDto extends BaseReadAllDto {
	@IsOptional()
	@MaxLength(255)
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	discription?: string;

	@IsOptional()
	@IsDefined()
	@IsArray()
	flags?: string[];

	@IsOptional()
	@IsNotEmpty()
	@Transform(({ value }) => new Date(value))
	@IsDate()
	time?: Date;

	@IsOptional()
	@IsString()
	place?: string;
}
