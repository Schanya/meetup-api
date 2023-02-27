import { Transform } from 'class-transformer';
import { IsString, MaxLength, IsDate, IsInt } from 'class-validator';

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
