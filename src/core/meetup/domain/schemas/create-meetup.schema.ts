import * as Joi from 'joi';
import { CreateMeetupDto } from '../dto/create-meetup.dto';

export const CreateMeetupSchema = Joi.object<CreateMeetupDto>({
	title: Joi.string().min(3).max(255).required(),
	description: Joi.string().max(255).min(4).optional(),
	flags: Joi.array<String>().required(),
	time: Joi.date().required(),
	place: Joi.string().min(4).max(255).required(),
}).options({
	abortEarly: false,
});
