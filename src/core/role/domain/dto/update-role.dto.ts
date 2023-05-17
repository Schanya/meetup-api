import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
	@ApiProperty({
		description: 'Role name',
		example: 'EXAMPLE',
		required: false,
	})
	name?: string;
}
