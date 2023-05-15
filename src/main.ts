import { config } from 'dotenv';
config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './configs/swagger-module-options.config';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = parseInt(process.env.APP_PORT || '3000', 10);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	SwaggerModule.setup(
		'doc',
		app,
		SwaggerModule.createDocument(app, swaggerConfig),
	);

	app.use(cookieParser());
	await app.listen(port);
}
bootstrap();
