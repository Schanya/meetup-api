import * as Joi from 'joi';
import { BaseReadAllSchema } from 'src/common/schemas/based-read-all.schema';
import { ReadAllUserDto } from '../dto/read-all-user.dto';

export const ReadAllUserSchema = Joi.object<ReadAllUserDto>({
	email: Joi.string().max(255).optional(),
	roles: Joi.array<String>().optional(),
})
	.options({
		abortEarly: false,
	})
	.concat(BaseReadAllSchema);
