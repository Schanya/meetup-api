import { IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';

export class ReadAllMeetupDto extends BaseReadAllDto {
	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;
}
