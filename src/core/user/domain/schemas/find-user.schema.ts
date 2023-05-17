import * as Joi from 'joi';
import { UserOptions } from '../dto/find-user.options';

export const FindUserSchema = Joi.object<UserOptions>({
	id: Joi.number().optional(),
	email: Joi.string().email().max(255).optional(),
}).options({
	abortEarly: false,
});
