import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMeetupDto {
	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;
}
