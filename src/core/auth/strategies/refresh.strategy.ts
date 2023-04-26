import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/core/user/domain/user.service';
import { PayloadDto } from '../presentation/payload.dto';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
	constructor(private userService: UserService) {
		super({
			ignoreExpiration: false,
			passReqToCallback: false,
			secretOrKey: process.env.REFRESH_TOKEN_SECRET,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request) => {
					let data = request?.cookies['auth-cookie'];
					if (!data) {
						return null;
					}
					return data.refreshToken;
				},
			]),
		});
	}

	async validate(payload: PayloadDto) {
		if (!payload) {
			throw new BadRequestException('invalid jwt token');
		}

		const user = await this.userService.findOne({ id: payload.id });

		return user;
	}
}
