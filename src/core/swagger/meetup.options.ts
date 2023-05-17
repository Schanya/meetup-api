import { getSchemaPath } from '@nestjs/swagger';
import { FrontendMeetup } from '../meetup/domain/types/meetup.type';

export const createMeetupLinksOptions = {
	getOne: {
		operationId: 'getOne',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `GET /meetup/{id}` request.',
	},
	delete: {
		operationId: 'delete',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `DELETE /meetup/{id}` request.',
	},
	update: {
		operationId: 'update',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `PUT /meetup/{id}` request.',
	},
};

export const getAllMeetupSchemaOptions = {
	properties: {
		totalRecordsNumber: { type: 'number', example: 1 },
		entities: {
			type: 'array',
			items: { $ref: getSchemaPath(FrontendMeetup) },
		},
	},
};
