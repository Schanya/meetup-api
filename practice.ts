import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration-lts';
import { Sequelize } from 'sequelize-typescript';
import { join } from 'path';

import { Dialect } from 'sequelize';
import { Meetup } from 'src/core/meetup/domain/meetup.entity';
import { Flag } from 'src/core/flag/domain/flag.entity';
import { User } from 'src/core/user/domain/user.entity';
import { Role } from 'src/core/role/domain/role.entity';

import { config } from 'dotenv';
config();

const bootstrap = async () => {
	const sequelize: Sequelize = new Sequelize({
		username: process.env.POSTGRES_DB_USERNAME,
		password: process.env.POSTGRES_DB_PASSWORD,
		database: process.env.POSTGRES_DB_NAME,
		host: process.env.POSTGRES_DB_HOST,
		port: Number.parseInt(process.env.POSTGRES_DB_PORT, 10),
		dialect: process.env.POSTGRES_DB_DIALECT as Dialect,
		models: [Meetup, Flag, User, Role],
		logging: false,
	});
	try {
		const result = await SequelizeTypescriptMigration.makeMigration(sequelize, {
			outDir: join(__dirname, './db/migrations'),
			migrationName: 'init',
			useSnakeCase: false,
		});
		console.log(result);
	} catch (e) {
		console.log(e);
	}
};

bootstrap();
