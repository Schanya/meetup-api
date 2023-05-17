import { ApiProperty } from '@nestjs/swagger';

export class RoleOptions {
	@ApiProperty({ description: 'Role identifier', example: 1, required: false })
	id?: number;

	@ApiProperty({
		description: 'Role name',
		example: 'EXAMPLE',
		required: false,
	})
	name?: string;
}
