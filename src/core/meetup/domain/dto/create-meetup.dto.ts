import { Transform } from 'class-transformer';
import {
	IsArray,
	IsDate,
	IsDefined,
	IsNotEmpty,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateMeetupDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	title: string;

	@IsString()
	description?: string;

	@IsDefined()
	@IsArray()
	@IsString({ each: true })
	flags: string[];

	@IsNotEmpty()
	@Transform(({ value }) => new Date(value))
	@IsDate()
	time: Date;

	@IsNotEmpty()
	@IsString()
	place: string;
}
