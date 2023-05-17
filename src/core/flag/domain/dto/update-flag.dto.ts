import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlagDto {
	@ApiProperty({ description: 'Flag name', example: 'Test', required: false })
	name?: string;
}
