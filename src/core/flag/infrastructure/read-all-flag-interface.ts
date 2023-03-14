import { IPaginationOptions } from 'src/common/types/pagination-options';
import { ISortingOptions } from 'src/common/types/sorting.options';

export interface IReadAllFlagOptions {
	filter?: {
		name?: string;
	};
	pagination?: IPaginationOptions;
	sorting?: ISortingOptions;
}
