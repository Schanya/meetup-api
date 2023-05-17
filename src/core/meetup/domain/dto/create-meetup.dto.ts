import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetupDto {
	@ApiProperty({
		description: 'Meetup title',
		example: 'Example',
		required: true,
	})
	title: string;

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
		required: true,
	})
	flags: string[];

	@ApiProperty({
		description: 'Meetup time (can be used as a filter )',
		example: '2023-02-27',
		required: true,
	})
	time: Date;

	@ApiProperty({
		description:
			'Meetup place (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: 'google meetup',
		required: true,
	})
	place: string;
}
