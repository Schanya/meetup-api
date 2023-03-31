import { Op } from 'sequelize';

export class UserFiltration {
	static getLikeFilters(filter) {
		const usersFilters = {};
		const rolesFilters = {};

		for (let [key, value] of Object.entries(filter)) {
			if (key !== 'roles') {
				usersFilters[key] = { [Op.like]: `%${value}%` };
			}

			if (key === 'roles' && Array.isArray(value)) {
				rolesFilters['name'] = { [Op.like]: { [Op.any]: value } };
			}
		}
		return {
			usersFilters,
			rolesFilters,
		};
	}
}
