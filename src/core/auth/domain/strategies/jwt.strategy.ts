import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDto } from '../payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request) => {
					let data = request?.cookies['auth-cookie'];
					if (!data) {
						return null;
					}
					return data.accessToken;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.ACCESS_TOKEN_SECRET,
		});
	}

	async validate(payload: PayloadDto) {
		return { id: payload.id, roles: payload.roles, email: payload.email };
	}
}
