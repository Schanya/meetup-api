import { Role } from '../role.entity';

export class FrontendRole {
	public id: number;
	public name: string;

	constructor(role: Role) {
		this.id = role.id;
		this.name = role.name;
	}
}
