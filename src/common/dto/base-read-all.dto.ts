import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { SortingDto } from './sorting.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BaseReadAllDto {
	@ApiProperty()
	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => PaginationDto)
	public pagination?: PaginationDto;

	@ApiProperty()
	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => SortingDto)
	public sorting?: SortingDto;
}
