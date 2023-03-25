import { User } from '../../domain/user.entity';

export class FrontendUser {
	public id: number;
	public email: string;
	public password: string;
	public roles: {
		id: number;
		name: string;
	}[];

	constructor(user: User) {
		this.id = user.id;
		this.email = user.email;
		this.password = user.password;
		this.roles = user.roles.map((role) => ({
			id: role.id,
			name: role.name,
		}));
	}
}
