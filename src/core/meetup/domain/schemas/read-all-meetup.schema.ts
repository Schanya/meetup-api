import * as Joi from 'joi';
import { BaseReadAllSchema } from 'src/common/schemas/based-read-all.schema';
import { ReadAllMeetupDto } from '../dto/read-all-meetup.dto';

export const ReadAllMeetupSchema = Joi.object<ReadAllMeetupDto>({
	title: Joi.string().max(255).optional(),
	description: Joi.string().max(255).optional(),
	flags: Joi.array<String>().optional(),
	time: Joi.date().optional(),
	place: Joi.string().max(255).optional(),
})
	.options({
		abortEarly: false,
	})
	.concat(BaseReadAllSchema);
