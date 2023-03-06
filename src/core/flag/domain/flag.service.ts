import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FlagDto, FlagOptions } from '../presentation/flag.dto';
import { Flag } from './flag.entity';

@Injectable()
export class FlagService {
	constructor(@InjectModel(Flag) private flagRepository: typeof Flag) {}

	public async findAll(options: FlagOptions): Promise<Flag[]> {
		const suitableFlags = await this.flagRepository.findAll({
			where: { ...options },
			include: { all: true },
		});

		return suitableFlags;
	}

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

	public async update(id: number, flagOptions: FlagOptions): Promise<Flag> {
		const existingFlag = await this.findBy({ id: id });

		if (!existingFlag) {
			throw new BadRequestException("Such meetup doesn't exist");
		}

		const sameFlag = await this.findBy({ name: flagOptions.name });

		if (sameFlag) {
			throw new BadRequestException('Such meetup already exists');
		}

		await this.flagRepository.update(flagOptions, { where: { id } });

		const updatedFlag = await this.findBy({ id: id });

		return updatedFlag;
	}

	public async delete(id: number): Promise<number> {
		const numberDeletedRows = await this.flagRepository.destroy({
			where: { id },
		});

		if (!numberDeletedRows)
			throw new BadRequestException('There is no suitable meetup');

		return numberDeletedRows;
	}
}
