import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FlagDto, FlagOptions } from '../presentation/flag.dto';
import { Flag } from './flag.entity';

@Injectable()
export class FlagService {
	constructor(@InjectModel(Flag) private flagRepository: typeof Flag) {}

	public async findBy(options: FlagOptions): Promise<Flag> {
		const suitableFlag = await this.flagRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableFlag;
	}

	public async create(flagDto: FlagDto): Promise<Flag> {
		const existingFlag = await this.findBy({ name: flagDto.name });

		if (existingFlag) {
			throw new BadRequestException('Such flag has already exist');
		}

		return await this.flagRepository.create(flagDto);
	}
}
