import { ApiProperty } from '@nestjs/swagger';

export class CreateFlagDto {
	@ApiProperty({
		description: 'Flag name',
		example: 'Test',
		nullable: false,
		required: true,
	})
	name: string;
}
