'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "userId" from table "meetups"
 * createTable "meetups_users", deps: [meetups, users]
 * addColumn "author_id" to table "meetups"
 *
 **/

const info = {
    "revision": 4,
    "name": "init",
    "created": "2023-04-06T09:51:54.326Z",
    "comment": ""
};

const migrationCommands = [

    {
        fn: "createTable",
        params: [
            "SequelizeMigrationsMeta",
            {
                "revision": {
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "state": {
                    "allowNull": false,
                    "type": Sequelize.JSON
                },
            },
            {}
        ]
    },
    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision
            }],
            {}
        ]
    },
    {
        fn: "bulkInsert",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
                name: info.name,
                state: '{"revision":4,"tables":{"meetups":{"tableName":"meetups","schema":{"id":{"seqType":"Sequelize.INTEGER","unique":true,"primaryKey":true,"autoIncrement":true},"title":{"seqType":"Sequelize.STRING","allowNull":false},"description":{"seqType":"Sequelize.STRING"},"time":{"seqType":"Sequelize.DATE","allowNull":false},"place":{"seqType":"Sequelize.STRING","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"},"author_id":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"users","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"flags":{"tableName":"flags","schema":{"id":{"seqType":"Sequelize.INTEGER","unique":true,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"users":{"tableName":"users","schema":{"id":{"seqType":"Sequelize.INTEGER","unique":true,"primaryKey":true,"autoIncrement":true},"email":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"password":{"seqType":"Sequelize.STRING","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"roles":{"tableName":"roles","schema":{"id":{"seqType":"Sequelize.INTEGER","unique":true,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"meetups_flags":{"tableName":"meetups_flags","schema":{"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"meetup_id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"references":{"model":"meetups","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"flag_id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"references":{"model":"flags","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"}},"indexes":{}},"meetups_users":{"tableName":"meetups_users","schema":{"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"meetup_id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"references":{"model":"meetups","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"user_id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"references":{"model":"users","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"}},"indexes":{}},"users_roles":{"tableName":"users_roles","schema":{"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"user_id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"references":{"model":"users","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"role_id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"references":{"model":"roles","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },



    {
        fn: "removeColumn",
        params: ["meetups", "userId"]
    },

    {
        fn: "createTable",
        params: [
            "meetups_users",
            {
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "meetup_id": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "meetups",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "user_id": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },
    {
        fn: "addColumn",
        params: [
            "meetups",
            "author_id",
            {
                "onDelete": "SET NULL",
                "onUpdate": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": true,
                "type": Sequelize.INTEGER
            }
        ]
    }
];

const rollbackCommands = [

    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
            }],
            {}
        ]
    },



    {
        fn: "removeColumn",
        params: ["meetups", "author_id"]
    },
    {
        fn: "dropTable",
        params: ["meetups_users"]
    },
    {
        fn: "addColumn",
        params: [
            "meetups",
            "userId",
            {
                "onDelete": "SET NULL",
                "onUpdate": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": true,
                "type": Sequelize.INTEGER
            }
        ]
    }
];

module.exports = {
  pos: 0,
  up: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }

      next();
    });
  },
  down: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else resolve();
      }

      next();
    });
  },
  info
};
