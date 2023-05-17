import * as Joi from 'joi';
import { UpdateMeetupDto } from '../dto/update-meetup.dto';

export const UpdateMeetupSchema = Joi.object<UpdateMeetupDto>({
	title: Joi.string().min(3).max(255).optional(),
	description: Joi.string().max(255).min(4).optional(),
	flags: Joi.array<String>().optional(),
	time: Joi.date().optional(),
	place: Joi.string().min(4).max(255).optional(),
}).options({
	abortEarly: false,
});
