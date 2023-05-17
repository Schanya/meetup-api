import * as Joi from 'joi';
import { SecretData } from '../dto/secret-date.dto';

export const SecretDateSchema = Joi.object<SecretData>({
	accessToken: Joi.string().required(),
	refreshToken: Joi.string().required(),
}).options({
	abortEarly: false,
});
