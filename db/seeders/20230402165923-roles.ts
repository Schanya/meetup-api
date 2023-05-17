'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('roles', [
			{
				id: 1,
				name: 'ADMIN',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: 'USER',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('roles', null, {});
	},
};
