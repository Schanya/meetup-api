import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Flag } from './domain/flag.entity';
import { FlagController } from './presentation/flag.controller';
import { FlagService } from './application/flag.service';

@Module({
	imports: [SequelizeModule.forFeature([Flag])],
	controllers: [FlagController],
	providers: [FlagService],
	exports: [FlagService],
})
export class FlagModule {}
