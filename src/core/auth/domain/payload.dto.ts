import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/core/role/domain/role.entity';

export class PayloadDto {
	@IsNotEmpty()
	@IsString()
	id: number;

	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsArray()
	roles: Role[];
}
