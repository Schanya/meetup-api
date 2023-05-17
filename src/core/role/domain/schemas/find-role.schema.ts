import * as Joi from 'joi';
import { RoleOptions } from '../dto/find-role.options';

export const FindRoleSchema = Joi.object<RoleOptions>({
	id: Joi.number().optional(),
	name: Joi.string().max(255).min(3).optional(),
}).options({
	abortEarly: false,
});
