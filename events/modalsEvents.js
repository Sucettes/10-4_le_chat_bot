"use strict";


const {Events} = require("discord.js");
const RandomCommand = require("../commands/randomCommands/random");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {
            if (!interaction.isModalSubmit()) return;

            switch (interaction.customId) {
                case "randomNumberModal":
                    await RandomCommand.onModalRandomNumberSubmit(interaction);
                    break;
            }
        } catch (e) {
            console.error(e);
        }
    },
};
