import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { FrontendUser } from '../user/domain/types/user.type';

export const createUserLinksOptions = {
	getOne: {
		operationId: 'getOne',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `GET /user/{id}` request.',
	},
	delete: {
		operationId: 'delete',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `DELETE /user/{id}` request.',
	},
	update: {
		operationId: 'update',
		parameters: {
			id: '$response.body#/id',
		},
		description:
			'The `id` value returned in the response can be used as the `id` parameter in the `PUT /user/{id}` request.',
	},
};

export const getAllUserSchemaOptions = {
	properties: {
		totalRecordsNumber: { type: 'number', example: 1 },
		entities: {
			type: 'array',
			items: { $ref: getSchemaPath(FrontendUser) },
		},
	},
};
