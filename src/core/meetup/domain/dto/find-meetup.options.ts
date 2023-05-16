import { ApiProperty } from '@nestjs/swagger';
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
	@ApiProperty({
		description: 'Meetup identifier',
		example: 1,
		required: false,
	})
	@IsOptional()
	@IsInt()
	id?: number;

	@ApiProperty({
		description: 'Meetup title',
		example: 'Example',
		required: false,
	})
	@IsOptional()
	@MaxLength(255)
	@IsString()
	title?: string;

	@ApiProperty({
		description: 'Meetup description',
		example: 'important meetup',
		required: false,
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		description:
			'Meetup flags (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: ['EXAMPLE', 'TEST'],
		required: false,
	})
	@IsOptional()
	@IsDefined()
	@IsArray()
	@IsString({ each: true })
	flags?: string[];

	@ApiProperty({
		description: 'Meetup time (can be used as a filter )',
		example: '2023-02-27',
		required: false,
	})
	@IsOptional()
	@IsNotEmpty()
	@Transform(({ value }) => new Date(value))
	@IsDate()
	time?: Date;

	@ApiProperty({
		description:
			'Meetup place (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: 'google meetup',
		required: false,
	})
	@IsOptional()
	@IsString()
	place?: string;
}
