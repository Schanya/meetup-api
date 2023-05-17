import { ApiProperty } from '@nestjs/swagger';

export class UserOptions {
	@ApiProperty({
		description: 'User identifier',
		example: 1,
		required: false,
		nullable: true,
	})
	id?: number;

	@ApiProperty({
		description: 'User email',
		example: 'test@gmail.com',
		required: false,
		nullable: true,
	})
	email?: string;
}
