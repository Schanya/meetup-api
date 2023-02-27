import { Controller } from '@nestjs/common';
import { FlagService } from '../domain/flag.service';

@Controller('flag')
export class FlagController {
	constructor(readonly flagService: FlagService) {}
}
