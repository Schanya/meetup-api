import { Module } from '@nestjs/common';
import { RoleController } from './application/role.controller';
import { RoleService } from './domain/role.service';

@Module({
	imports: [],
	controllers: [RoleController],
	providers: [RoleService],
	exports: [],
})
export class RoleModule {}
