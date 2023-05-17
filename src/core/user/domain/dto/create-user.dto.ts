import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({
		description: 'User email',
		example: 'test@gmail.com',
		required: true,
		nullable: false,
	})
	email: string;

	@ApiProperty({
		description: "User's password",
		example: 'test',
		required: true,
		nullable: false,
	})
	password: string;
}
