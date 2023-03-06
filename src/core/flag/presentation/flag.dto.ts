import { IsString, IsNotEmpty, MaxLength, IsInt } from 'class-validator';

export class FlagDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}

export class FlagOptions {
	@IsInt()
	id?: number;

	@MaxLength(255)
	@IsString()
	name?: string;
}
