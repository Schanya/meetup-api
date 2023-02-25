import { SequelizeModuleOptions } from '@nestjs/sequelize';

const dbconfig: SequelizeModuleOptions = {
	dialect: 'postgres',
	host: process.env.POSTGRES_DB_HOST || 'localhost',
	port: Number.parseInt(process.env.POSTGRES_DB_PORT || '5432', 10),
	username: process.env.POSTGRES_DB_USERNAME || 'postgres',
	password: process.env.POSTGRES_DB_PASSWORD || 'SCH08',
	database: process.env.POSTGRES_DB_NAME || 'meetup_db',
	models: [],
	autoLoadModels: true,
	synchronize: true,
};

export { dbconfig };
