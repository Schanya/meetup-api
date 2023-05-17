import * as Joi from 'joi';
import { CreateFlagDto } from '../dto/create-flag.dto';

export const CreateFlagSchema = Joi.object<CreateFlagDto>({
	name: Joi.string().max(255).min(3).required(),
}).options({
	abortEarly: false,
});
