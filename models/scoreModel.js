"use strict";

const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("scores", {
        memberId: {
            type: DataTypes.NUMBER,
            allowNull: false,
            isNumeric: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            isDate: true,
        },
        score: {
            type: DataTypes.NUMBER,
            defaultValue: 0,
            isNumeric: true,
            min: 0,
            max: 998
        }
    });
};
