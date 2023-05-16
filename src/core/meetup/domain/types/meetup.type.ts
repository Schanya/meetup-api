import { Meetup } from '../meetup.entity';

export class FrontendMeetup {
	public id: number;
	public title: string;
	public description: string;
	public time: Date;
	public place: string;
	public author: {
		id: number;
		email: string;
	};
	public members: {
		id: number;
		email: string;
	}[];
	public flags: {
		id: number;
		name: string;
	}[];

	constructor(meetup: Meetup) {
		this.id = meetup.id;
		this.title = meetup.title;
		this.description = meetup.description;
		this.time = meetup.time;
		this.place = meetup.place;
		this.author = {
			id: meetup.author.id,
			email: meetup.author.email,
		};
		this.members = meetup.members.map((member) => ({
			id: member.id,
			email: member.email,
		}));
		this.flags = meetup.flags.map((flag) => ({
			id: flag.id,
			name: flag.name,
		}));
	}
}
