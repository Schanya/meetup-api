import * as Joi from 'joi';
import { BaseReadAllSchema } from 'src/common/schemas/based-read-all.schema';
import { ReadAllFlagDto } from '../dto/read-all-flag.dto';

export const ReadAllFlagSchema = Joi.object<ReadAllFlagDto>({
	name: Joi.string().max(255).optional(),
})
	.options({
		abortEarly: false,
	})
	.concat(BaseReadAllSchema);
