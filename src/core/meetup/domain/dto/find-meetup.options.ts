import { ApiProperty } from '@nestjs/swagger';

export class MeetupOptions {
	@ApiProperty({
		description: 'Meetup identifier',
		example: 1,
		required: false,
	})
	id?: number;

	@ApiProperty({
		description: 'Meetup title',
		example: 'Example',
		required: false,
	})
	title?: string;

	@ApiProperty({
		description: 'Meetup description',
		example: 'important meetup',
		required: false,
	})
	description?: string;

	@ApiProperty({
		description:
			'Meetup flags (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: ['EXAMPLE', 'TEST'],
		required: false,
	})
	flags?: string[];

	@ApiProperty({
		description: 'Meetup time (can be used as a filter )',
		example: '2023-02-27',
		required: false,
	})
	time?: Date;

	@ApiProperty({
		description:
			'Meetup place (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: 'google meetup',
		required: false,
	})
	place?: string;
}
