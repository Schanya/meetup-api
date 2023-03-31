import { User } from 'src/core/user/domain/user.entity';
import { Meetup } from '../../domain/meetup.entity';

export class FrontendMeetup {
	public id: number;
	public title: string;
	public description: string;
	public time: Date;
	public place: string;
	public user: User;
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
		this.user = meetup.userId;
		this.flags = meetup.flags.map((flag) => ({
			id: flag.id,
			name: flag.name,
		}));
	}
}
