import { Op } from 'sequelize';

export class UserFiltration {
	static getLikeFilters(filter) {
		const usersFilters = {};

		for (let [key, value] of Object.entries(filter)) {
			usersFilters[key] = { [Op.like]: `%${value}%` };
		}
		return {
			usersFilters,
		};
	}
}
