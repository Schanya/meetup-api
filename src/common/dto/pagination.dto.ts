import { IsInt, IsDefined, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { defaultPagination } from '../constants/pagination.constants';

export class PaginationDto {
	@IsInt()
	@Min(1)
	@Type(() => Number)
	public page: number = defaultPagination.page;

	@IsInt()
	@Min(1)
	@Max(50)
	@Type(() => Number)
	public size: number = defaultPagination.size;

	get offset(): number {
		return (this.page - 1) * this.size;
	}
}
