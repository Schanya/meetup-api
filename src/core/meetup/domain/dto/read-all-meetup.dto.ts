import { ApiProperty } from '@nestjs/swagger';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';

export class ReadAllMeetupDto extends BaseReadAllDto {
	@ApiProperty({
		description:
			'Meetup title (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: 'example',
		required: false,
	})
	title?: string;

	@ApiProperty({
		description:
			'Meetup description (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: 'important meetup',
		required: false,
	})
	description?: string;

	@ApiProperty({
		description:
			'Meetup flags (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: ['EXAMPLE', 'TEST'],
		type: [String],
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
