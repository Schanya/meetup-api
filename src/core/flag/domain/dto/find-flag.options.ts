import { ApiProperty } from '@nestjs/swagger';

export class FindFlagOptions {
	@ApiProperty({ description: 'Flag identifier', example: 1, required: false })
	id?: number;

	@ApiProperty({ description: 'Flag name', example: 'Test', required: false })
	name?: string;
}
