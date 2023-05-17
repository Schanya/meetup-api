import * as Joi from 'joi';
import { UpdateUserDto } from '../dto/update-user.dto';

export const UpdateUserSchema = Joi.object<UpdateUserDto>({
	email: Joi.string().email().max(255).optional(),
	password: Joi.string().max(255).min(4).optional(),
}).options({
	abortEarly: false,
});
