import { ApiProperty } from '@nestjs/swagger';
import { Flag } from '../../domain/flag.entity';

export class FrontendFlag {
	@ApiProperty({ description: 'Flag identifier', example: 1 })
	public id: number;
	@ApiProperty({ description: 'Flag name', example: 'Test' })
	public name: string;

	constructor(tag: Flag) {
		this.id = tag.id;
		this.name = tag.name;
	}
}
