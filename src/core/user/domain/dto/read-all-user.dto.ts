import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsOptional, IsString } from 'class-validator';
import { BaseReadAllDto } from 'src/common/dto/base-read-all.dto';

export class ReadAllUserDto extends BaseReadAllDto {
	@ApiProperty({
		description:
			'User email (can be used as a filter e.g. enter one letter and get records containing that letter)',
		example: 'test@gmail.com',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsDefined()
	@IsString()
	email?: string;

	@ApiProperty({
		type: Array<string>,
		description:
			"User' roles (can be used as a filter e.g. enter one letter and get records containing that letter)",
		example: ['TEST', 'ADMIN'],
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsDefined()
	@IsArray()
	roles?: string[];
}
