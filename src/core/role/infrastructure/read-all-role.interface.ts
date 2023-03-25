import { IPaginationOptions } from 'src/common/types/pagination-options';
import { ISortingOptions } from 'src/common/types/sorting.options';

export interface IReadAllRoleOptions {
	filter?: {
		name?: string;
	};
	sorting?: ISortingOptions;
	pagination?: IPaginationOptions;
}
