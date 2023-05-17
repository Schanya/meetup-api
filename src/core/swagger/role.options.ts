import { getSchemaPath } from '@nestjs/swagger';
import { FrontendRole } from '../role/domain/types/role.type';

export const createRoleLinksOptions = {
	getOne: {
		operationId: 'getOne',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `GET /role/{id}` request.',
	},
	delete: {
		operationId: 'delete',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `DELETE /role/{id}` request.',
	},
	update: {
		operationId: 'update',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `PUT /role/{id}` request.',
	},
};

export const getAllRoleSchemaOptions = {
	properties: {
		totalRecordsNumber: { type: 'number', example: 1 },
		entities: {
			type: 'array',
			items: { $ref: getSchemaPath(FrontendRole) },
		},
	},
};
