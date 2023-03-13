import { IsInt, IsDefined, IsOptional, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationDto {
	@IsOptional()
	@IsDefined()
	@IsInt()
	@Min(1)
	@Type(() => Number)
	public page: number = 1;

	@IsOptional()
	@IsDefined()
	@IsInt()
	@Min(1)
	@Max(50)
	@Type(() => Number)
	public size: number = 10;

	get offset(): number {
		return (this.page - 1) * this.size;
	}
}
