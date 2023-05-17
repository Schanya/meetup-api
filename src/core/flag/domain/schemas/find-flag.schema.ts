import * as Joi from 'joi';
import { FindFlagOptions } from '../dto/find-flag.options';

export const FindFlagSchema = Joi.object<FindFlagOptions>({
	id: Joi.number().optional(),
	name: Joi.string().max(255).min(3).optional(),
}).options({
	abortEarly: false,
});
