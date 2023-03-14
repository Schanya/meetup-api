import { IsDefined, IsOptional, IsString } from 'class-validator';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';

export class ReadAllFlagDto extends BaseReadAllDto {
	@IsOptional()
	@IsDefined()
	@IsString()
	public name?: string;
}
