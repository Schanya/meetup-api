import { IsInt, IsDefined, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
	@IsOptional()
	@IsDefined()
	@IsInt()
	@Min(1)
	@Type(() => Number)
	public page: number;
	@IsOptional()
	@IsDefined()
	@IsInt()
	@Min(1)
	@Max(50)
	@Type(() => Number)
	public size: number;

	get offset(): number {
		return (this.page - 1) * this.size;
	}
}
