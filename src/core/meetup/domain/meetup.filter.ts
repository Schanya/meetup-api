import { Op } from 'sequelize';

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
