import { Op } from 'sequelize';

export class RoleFiltration {
	static getLikeFilters(filter) {
		const rolesFilters = {};

		for (let [key, value] of Object.entries(filter)) {
			rolesFilters[key] = { [Op.like]: `%${value}%` };
		}
		return {
			rolesFilters,
		};
	}
}
