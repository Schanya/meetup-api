import { IsDefined, IsOptional, IsString } from 'class-validator';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';

export class ReadAllUserDto extends BaseReadAllDto {
	@IsOptional()
	@IsDefined()
	@IsString()
	public email?: string;
}
