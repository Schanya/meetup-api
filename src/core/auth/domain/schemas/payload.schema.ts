import * as Joi from 'joi';
import { PayloadDto } from '../dto/payload.dto';

export const PayloadSchema = Joi.object<PayloadDto>({
	id: Joi.number().optional(),
	email: Joi.string().email().max(255).required(),
	roles: Joi.array<String>().required(),
}).options({
	abortEarly: false,
});
