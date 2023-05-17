import { ApiProperty } from '@nestjs/swagger';
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
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';

export class ReadAllMeetupDto extends BaseReadAllDto {
	@ApiProperty({
		description:
			'Meetup title (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: 'example',
		required: false,
	})
	@IsOptional()
	@MaxLength(255)
	@IsString()
	title?: string;

	@ApiProperty({
		description:
			'Meetup description (can be used as a filter e.g. enter one letter and get records containing that letter)',
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
		type: [String],
		required: false,
	})
	@IsOptional()
	@IsDefined()
	@IsArray()
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
