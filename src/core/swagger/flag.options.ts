import { getSchemaPath } from '@nestjs/swagger';
import { FrontendFlag } from '../flag/domain/types/flag.type';

export const createFlagLinksOptions = {
	getOne: {
		operationId: 'getOne',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `GET /flag/{id}` request.',
	},
	delete: {
		operationId: 'delete',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `DELETE /flag/{id}` request.',
	},
	update: {
		operationId: 'update',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `PUT /flag/{id}` request.',
	},
};

export const getAllFlagSchemaOptions = {
	properties: {
		totalRecordsNumber: { type: 'number', example: 1 },
		entities: {
			type: 'array',
			items: { $ref: getSchemaPath(FrontendFlag) },
		},
	},
};
