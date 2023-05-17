import * as Joi from 'joi';

export const CreateFlagSchema = Joi.object({
	name: Joi.string().max(255).min(3).required(),
}).options({
	abortEarly: false,
});
