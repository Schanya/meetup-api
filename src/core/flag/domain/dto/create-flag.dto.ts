import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFlagDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}
