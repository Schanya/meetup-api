import { Flag } from '../domain/flag.entity';

export class FrontendFlag {
	public id: number;
	public name: string;

	constructor(tag: Flag) {
		this.id = tag.id;
		this.name = tag.name;
	}
}
