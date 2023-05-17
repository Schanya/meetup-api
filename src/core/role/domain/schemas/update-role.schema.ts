import * as Joi from 'joi';
import { UpdateRoleDto } from '../dto/update-role.dto';

export const UpdateRoleSchema = Joi.object<UpdateRoleDto>({
	name: Joi.string().max(255).min(3).optional(),
}).options({
	abortEarly: false,
});
