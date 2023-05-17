import * as Joi from 'joi';

export const UpdateFlagSchema = Joi.object({
	id: Joi.number().optional(),
	name: Joi.string().max(255).min(3).optional(),
}).options({
	abortEarly: false,
});
