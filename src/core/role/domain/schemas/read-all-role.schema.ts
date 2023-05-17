import * as Joi from 'joi';
import { BaseReadAllSchema } from 'src/common/schemas/based-read-all.schema';
import { ReadAllRoleDto } from '../dto/read-all-role.dto';

export const ReadAllRoleSchema = Joi.object<ReadAllRoleDto>({
	name: Joi.string().max(255).optional(),
})
	.options({
		abortEarly: false,
	})
	.concat(BaseReadAllSchema);
