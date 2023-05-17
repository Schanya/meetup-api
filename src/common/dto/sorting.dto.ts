import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsIn, IsString } from 'class-validator';
import { defaultSorting } from '../constants/sorting.constants';

export class SortingDto {
	@ApiProperty({
		name: 'sorting[column]',
		description: 'The name of the property to sort',
		default: 'id',
	})
	@IsDefined()
	@IsString()
	public column: string = defaultSorting.column;

	@ApiProperty({
		name: 'sorting[direction]',
		description: 'Sorting direction',
		enum: ['DESC', 'ASC'],
	})
	@IsDefined()
	@IsIn(['DESC', 'ASC'])
	public direction: 'DESC' | 'ASC' = defaultSorting.direction;
}
