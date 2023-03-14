import { Transform, Type } from 'class-transformer';
import {
	IsString,
	IsNotEmpty,
	MaxLength,
	IsDate,
	IsInt,
	IsArray,
	IsDefined,
	IsOptional,
} from 'class-validator';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';
import { Flag } from 'src/core/flag/domain/flag.entity';

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
	@Transform(({ value }) => new Date(value))
	@IsDate()
	time: Date;

	@IsNotEmpty()
	@IsString()
	place: string;
}

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
	discription?: string;

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

export class ReadAllMeetupDto extends BaseReadAllDto {
	@IsOptional()
	@MaxLength(255)
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	discription?: string;

	@IsOptional()
	@IsDefined()
	@IsArray()
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

export class UpdateMeetupOptions {
	@IsOptional()
	@MaxLength(255)
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	discription?: string;

	@IsOptional()
	@IsNotEmpty()
	@Transform(({ value }) => new Date(value))
	@IsDate()
	time?: Date;

	@IsOptional()
	@IsString()
	place?: string;
}
