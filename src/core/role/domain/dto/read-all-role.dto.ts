import { ApiProperty } from '@nestjs/swagger';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';

export class ReadAllRoleDto extends BaseReadAllDto {
	@ApiProperty({
		description:
			'Role name (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: 'EXAMPLE',
		required: false,
	})
	name?: string;
}
