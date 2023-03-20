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

export class UpdateMeetupDto {
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
	@IsString({ each: true })
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
