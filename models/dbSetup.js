"use strict";

const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: process.env.DIALECT,
    storage: process.env.DB_PATH,
    define: {
        timestamps: false,
        freezeTableName: true,
    },
    logging: false,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.scores = require("./scoreModel")(sequelize, Sequelize);

module.exports = db;
