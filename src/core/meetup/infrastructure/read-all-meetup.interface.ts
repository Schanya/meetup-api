import { IPaginationOptions } from 'src/common/types/pagination-options';
import { ISortingOptions } from 'src/common/types/sorting.options';

export interface IReadAllMeetupOptions {
	filter?: {
		title?: string;
		discription?: string;
		time?: Date;
		place?: string;
		flags?: string[];
	};
	sorting?: ISortingOptions;
	pagination?: IPaginationOptions;
}
