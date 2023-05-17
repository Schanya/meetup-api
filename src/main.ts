import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';

import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger-module-options.config';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = parseInt(process.env.APP_PORT || '3000', 10);

	SwaggerModule.setup(
		'doc',
		app,
		SwaggerModule.createDocument(app, swaggerConfig),
	);

	app.use(cookieParser());
	await app.listen(port);
}
bootstrap();
