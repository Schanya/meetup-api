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
		flags?: string[];
	};
	sorting?: ISortingOptions;
	pagination?: IPaginationOptions;
}

export class MeetupFiltration {
	static getLikeFilters(filter) {
		const meetupFilters = {};
		const flagsFilters = {};

		for (let [key, value] of Object.entries(filter)) {
			if (key !== 'flags') {
				meetupFilters[key] = { [Op.like]: `%${value}%` };
			}

			if (key === 'flags' && Array.isArray(value)) {
				flagsFilters['name'] = { [Op.like]: { [Op.any]: value } };
			}
		}
		return {
			meetupFilters,
			flagsFilters,
		};
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
