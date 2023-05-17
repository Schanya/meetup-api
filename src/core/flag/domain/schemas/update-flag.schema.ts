import * as Joi from 'joi';
import { UpdateFlagDto } from '../dto/update-flag.dto';

export const UpdateFlagSchema = Joi.object<UpdateFlagDto>({
	name: Joi.string().max(255).min(3).optional(),
}).options({
	abortEarly: false,
});
