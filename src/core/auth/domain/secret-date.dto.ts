import { ApiProperty } from '@nestjs/swagger';

export class SecretData {
	@ApiProperty({
		description: 'Access token',
		required: true,
		nullable: false,
	})
	accessToken: string;
	@ApiProperty({
		description: 'Refresh token',
		required: true,
		nullable: false,
	})
	refreshToken: string;
}
