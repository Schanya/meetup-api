'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "flags", deps: []
 * createTable "users", deps: []
 * createTable "roles", deps: []
 * createTable "meetups", deps: [users]
 * createTable "meetups_flags", deps: [meetups, flags]
 * createTable "users_roles", deps: [users, roles]
 *
 **/

const info = {
    "revision": 1,
    "name": "init",
    "created": "2023-04-02T16:19:37.478Z",
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
                state: '{"revision":1,"tables":{"meetups":{"tableName":"meetups","schema":{"id":{"seqType":"Sequelize.INTEGER","unique":true,"primaryKey":true,"autoIncrement":true},"title":{"seqType":"Sequelize.STRING","allowNull":false},"description":{"seqType":"Sequelize.STRING"},"time":{"seqType":"Sequelize.DATE","allowNull":false},"place":{"seqType":"Sequelize.STRING","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"},"userId":{"seqType":"Sequelize.INTEGER","allowNull":true,"references":{"model":"users","key":"id"},"onUpdate":"CASCADE","onDelete":"SET NULL"}},"indexes":{}},"flags":{"tableName":"flags","schema":{"id":{"seqType":"Sequelize.INTEGER","unique":true,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"users":{"tableName":"users","schema":{"id":{"seqType":"Sequelize.INTEGER","unique":true,"primaryKey":true,"autoIncrement":true},"email":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"password":{"seqType":"Sequelize.STRING","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"roles":{"tableName":"roles","schema":{"id":{"seqType":"Sequelize.INTEGER","unique":true,"primaryKey":true,"autoIncrement":true},"name":{"seqType":"Sequelize.STRING","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"meetups_flags":{"tableName":"meetups_flags","schema":{"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"meetup_id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"references":{"model":"meetups","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"flag_id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"references":{"model":"flags","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"}},"indexes":{}},"users_roles":{"tableName":"users_roles","schema":{"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"user_id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"references":{"model":"users","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"role_id":{"seqType":"Sequelize.INTEGER","primaryKey":true,"references":{"model":"roles","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },




    {
        fn: "createTable",
        params: [
            "flags",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "unique": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "users",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "unique": true,
                    "type": Sequelize.INTEGER
                },
                "email": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "password": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "roles",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "unique": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "meetups",
            {
                "id": {
                    "autoIncrement": true,
                    "primaryKey": true,
                    "unique": true,
                    "type": Sequelize.INTEGER
                },
                "title": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "description": {
                    "type": Sequelize.STRING
                },
                "time": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "place": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                },
                "userId": {
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "meetups_flags",
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
                "flag_id": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "flags",
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
        fn: "createTable",
        params: [
            "users_roles",
            {
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
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
                },
                "role_id": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "roles",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                }
            },
            {}
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
        fn: "dropTable",
        params: ["meetups"]
    },
    {
        fn: "dropTable",
        params: ["meetups_flags"]
    },
    {
        fn: "dropTable",
        params: ["users_roles"]
    },
    {
        fn: "dropTable",
        params: ["flags"]
    },
    {
        fn: "dropTable",
        params: ["users"]
    },
    {
        fn: "dropTable",
        params: ["roles"]
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
