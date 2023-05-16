import { IPaginationOptions } from 'src/common/types/pagination-options';
import { ISortingOptions } from 'src/common/types/sorting.options';

export interface IReadAllUserOptions {
	filter?: {
		email?: string;
		roles?: string[];
	};
	sorting?: ISortingOptions;
	pagination?: IPaginationOptions;
}
