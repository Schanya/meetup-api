import * as Joi from 'joi';
import { CreateRoleDto } from '../dto/create-role.dto';

export const CreateRoleSchema = Joi.object<CreateRoleDto>({
	name: Joi.string().max(255).min(3).required(),
}).options({
	abortEarly: false,
});
