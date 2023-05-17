import { ApiProperty } from '@nestjs/swagger';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';

export class ReadAllFlagDto extends BaseReadAllDto {
	@ApiProperty({
		description:
			'Flag name (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: 'Test',
		required: false,
		nullable: true,
	})
	public name?: string;
}
