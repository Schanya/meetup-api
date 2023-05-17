import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
	.setTitle('MEETUP-API')
	.setDescription('CRUD REST Web API for working with meetups')
	.addCookieAuth('cookie', {
		type: 'apiKey',
		in: 'cookie',
		name: 'auth-cookie',
	})
	.build();
