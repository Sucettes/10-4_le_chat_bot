"use strict";

const { Events } = require('discord.js');
const DogsOrCats = require('../commands/dogsOrCats')

module.exports = {
	name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId === 'DoCCats' || interaction.customId === 'DoCDogs') {
            await DogsOrCats.onChoiceClick(interaction);
        }
	},
};