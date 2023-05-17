import { IsInt, IsDefined, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { defaultPagination } from '../constants/pagination.constants';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
	@ApiProperty({
		name: 'pagination[page]',
		description: 'Number of pages',
		minimum: 1,
		default: defaultPagination.page,
	})
	@IsInt()
	@Min(1)
	@Type(() => Number)
	public page: number = defaultPagination.page;

	@ApiProperty({
		name: 'pagination[size]',
		description: 'Number of entries per page',
		minimum: 1,
		maximum: 50,
		default: defaultPagination.size,
	})
	@IsInt()
	@Min(1)
	@Max(50)
	@Type(() => Number)
	public size: number = defaultPagination.size;

	get offset(): number {
		return (this.page - 1) * this.size;
	}
}
