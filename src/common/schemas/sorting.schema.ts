import * as Joi from 'joi';
import { defaultPagination } from '../constants/pagination.constants';
import { SortingDto } from '../dto/sorting.dto';
import { defaultSorting } from '../constants/sorting.constants';

export const SortingSchema = Joi.object<SortingDto>({
	column: Joi.string().default(defaultSorting.column),
	direction: Joi.string().valid('DESC', 'ASC').default(defaultPagination.size),
}).options({
	abortEarly: false,
});
