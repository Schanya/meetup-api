import { Transform } from 'class-transformer';
import {
	IsString,
	IsNotEmpty,
	MaxLength,
	IsDate,
	IsInt,
	IsArray,
	IsDefined,
} from 'class-validator';

export class MeetupDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	title: string;

	@IsString()
	discription?: string;

	@IsDefined()
	@IsArray()
	@IsString({ each: true })
	flags: string[];

	@IsNotEmpty()
	@Transform(() => Date)
	@IsDate()
	time: Date;

	@IsNotEmpty()
	@IsString()
	place: string;
}

export class MeetupOptions {
	@IsInt()
	id?: number;

	@MaxLength(255)
	@IsString()
	title?: string;

	@IsString()
	discription?: string;

	@Transform(() => Date)
	@IsDate()
	time?: Date;

	@IsString()
	place?: string;
}
