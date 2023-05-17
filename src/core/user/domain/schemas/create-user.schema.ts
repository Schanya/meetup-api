import * as Joi from 'joi';
import { CreateUserDto } from '../dto/create-user.dto';

export const CreateUserSchema = Joi.object<CreateUserDto>({
	email: Joi.string().email().max(255).required(),
	password: Joi.string().max(255).min(4).required(),
}).options({
	abortEarly: false,
});
