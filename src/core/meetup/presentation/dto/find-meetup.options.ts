import { Transform } from 'class-transformer';
import {
	IsArray,
	IsDate,
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class MeetupOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@MaxLength(255)
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	description?: string;

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
