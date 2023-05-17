import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
	@ApiProperty({
		description: 'Role name',
		example: 'EXAMPLE',
		required: true,
	})
	name: string;
}
