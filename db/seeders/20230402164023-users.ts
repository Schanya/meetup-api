'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('users', [
			{
				id: 1,
				email: 'admin@gmail.com',
				password:
					'$2b$10$47Osx4LR9oY0Tuw5Xa8BEORExmPn3L5P1Qk2LiXZSwqFVzj6QRXIy', //admin
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				email: 'user@gmail.com',
				password:
					'$2b$10$9ODgqND9oPwQh.9VmqnAo.rdvKrGVcywyZMfWKeV1KL/aLOfH4QR6', //user
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', null, {});
	},
};
