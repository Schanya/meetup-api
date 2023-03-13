import { Op } from 'sequelize';
import { IPaginationOptions } from 'src/common/types/pagination-options';
import { ISortingOptions } from 'src/common/types/sorting.options';
import { Meetup } from '../domain/meetup.entity';

export interface IReadAllMeetupOptions {
	filter?: {
		title?: string;
		discription?: string;
		time?: Date;
		place?: string;
	};
	sorting?: ISortingOptions;
	pagination?: IPaginationOptions;
}

export class TestMeetupFilter {
	title?: { [Op.like]: string };
	discription?: { [Op.like]: string };
	time?: { [Op.like]: string };
	place?: { [Op.like]: string };

	constructor(
		title?: string,
		// discription?: string,
		// time?: string,
		place?: string,
	) {
		this.title = { [Op.like]: title };
		// discription ? (this.discription = { [Op.like]: discription }) : discription;
		// time ? (this.time = { [Op.like]: time }) : time;
		this.place = { [Op.like]: place };
	}
}

export class FrontendMeetup {
	public id: number;
	public title: string;
	public description: string;
	public time: Date;
	public place: string;
	public flags: {
		id: number;
		name: string;
	}[];

	constructor(meetup: Meetup) {
		this.id = meetup.id;
		this.title = meetup.title;
		this.description = meetup.discription;
		this.time = meetup.time;
		this.place = meetup.place;
		this.flags = meetup.flags.map((flag) => ({
			id: flag.id,
			name: flag.name,
		}));
	}
}
