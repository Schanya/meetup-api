import { Op } from 'sequelize';

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
