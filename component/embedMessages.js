"use strict";

const { EmbedBuilder } = require("discord.js");

exports.errorMsg = async (title, desc) => {
    let embed = new EmbedBuilder()
        .setColor("#ED4245")
        .setDescription(desc);
    if (title !== "") {
        embed.setTitle(title);
    }
    return embed
};

exports.infoMsg = async (title, desc) => {
    let embed = new EmbedBuilder()
        .setColor("#00FFCB")
        .setDescription(desc);
    if (title !== "") {
        embed.setTitle(title);
    }
    return embed;
};

exports.warningMsg = async (title, desc) => {
    let embed = new EmbedBuilder()
        .setColor("#FEE75C")
        .setDescription(desc);
    if (title !== "") {
        embed.setTitle(title);
    }
    return embed;
};

exports.successMsg = async (title, desc) => {
    let embed = new EmbedBuilder()
        .setColor("#57F287")
        .setDescription(desc);
    if (title !== "") {
        embed.setTitle(title);
    }
    return embed;
};