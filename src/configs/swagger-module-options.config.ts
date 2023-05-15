import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
	.setTitle('MEETUP-API')
	.setDescription('CRUD REST Web API for working with meetups')
	.addBearerAuth({
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'Token access-token',
	})
	.build();
