import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Flag } from './domain/flag.entity';

@Module({
	imports: [SequelizeModule.forFeature([Flag])],
	controllers: [],
	providers: [],
	exports: [],
})
export class FlagModule {}
