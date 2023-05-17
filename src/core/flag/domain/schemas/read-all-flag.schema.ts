import * as Joi from 'joi';
import { BaseReadAllSchema } from 'src/common/schemas/based-read-all.schema';

export const ReadAllFlagSchema = Joi.object({
	name: Joi.string().max(255).optional(),
})
	.options({
		abortEarly: false,
	})
	.concat(BaseReadAllSchema);
