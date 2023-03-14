import { Op } from 'sequelize';
import { IPaginationOptions } from 'src/common/types/pagination-options';
import { ISortingOptions } from 'src/common/types/sorting.options';
import { Flag } from '../domain/flag.entity';

export class FrontendFlag {
	public id: number;
	public name: string;

	constructor(tag: Flag) {
		this.id = tag.id;
		this.name = tag.name;
	}
}
export interface IReadAllFlagOptions {
	filter?: {
		name?: string;
	};
	pagination?: IPaginationOptions;
	sorting?: ISortingOptions;
}

export class FlagFiltration {
	static getLikeFilters(filter) {
		const flagsFilters = {};

		for (let [key, value] of Object.entries(filter)) {
			flagsFilters[key] = { [Op.like]: `%${value}%` };
		}
		return {
			flagsFilters,
		};
	}
}
