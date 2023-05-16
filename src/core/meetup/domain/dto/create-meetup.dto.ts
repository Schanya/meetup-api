import { ApiProperty } from '@nestjs/swagger';
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
	@ApiProperty({
		description: 'Meetup title',
		example: 'Example',
		required: true,
	})
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	title: string;

	@ApiProperty({
		description: 'Meetup description',
		example: 'important meetup',
		required: false,
	})
	@IsString()
	description?: string;

	@ApiProperty({
		description:
			'Meetup flags (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: ['EXAMPLE', 'TEST'],
		required: true,
	})
	@IsDefined()
	@IsArray()
	@IsString({ each: true })
	flags: string[];

	@ApiProperty({
		description: 'Meetup time (can be used as a filter )',
		example: '2023-02-27',
		required: true,
	})
	@IsNotEmpty()
	@Transform(({ value }) => new Date(value))
	@IsDate()
	time: Date;

	@ApiProperty({
		description:
			'Meetup place (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: 'google meetup',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	place: string;
}
