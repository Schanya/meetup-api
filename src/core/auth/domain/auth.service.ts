import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Transaction } from 'sequelize';
import { compare, hash } from 'src/common/helpers/hash';
import { CreateUserDto } from 'src/core/user/presentation/dto/create-user.dto';

import { User } from '../../user/domain/user.entity';
import { UserService } from '../../user/domain/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(createUserDto: CreateUserDto): Promise<User> {
		const candidate = await this.userService.findBy({
			email: createUserDto.email,
		});

		if (candidate && compare(createUserDto.password, candidate.password)) {
			const validUser = await this.userService.findBy({ id: candidate.id });

			return validUser;
		}

		throw new NotFoundException('Uncorrect email or password');
	}

	async registration(createUserDto: CreateUserDto, transaction: Transaction) {
		const candidate = await this.userService.findBy({
			email: createUserDto.email,
		});

		if (candidate) {
			throw new HttpException(
				'You are already registered',
				HttpStatus.BAD_REQUEST,
			);
		}

		const hashPassword = hash(createUserDto.password);

		const registeredUser = await this.userService.create(
			{
				...createUserDto,
				password: hashPassword,
			},
			transaction,
		);

		return registeredUser;
	}

	async login(createUserDto: CreateUserDto) {
		const user = await this.validateUser(createUserDto);
		const token = this.generateToken(user);

		return token;
	}

	private async generateToken(user: User) {
		const payload = {
			id: user.id,
			email: user.email,
			roles: user.roles.map((role) => role.name),
		};
		return {
			token: this.jwtService.sign(payload),
		};
	}
}
