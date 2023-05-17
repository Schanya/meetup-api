import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
	@ApiProperty({
		description: "User's email",
		example: 'test@gmail.com',
		required: false,
	})
	email?: string;

	@ApiProperty({
		description: "User's password",
		example: 'test',
		required: false,
	})
	password?: string;
}
