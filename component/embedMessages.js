"use strict";


const {EmbedBuilder} = require("discord.js");

exports.errorMsg = async (title, desc) => {
    return new EmbedBuilder()
        .setColor("#ED4245")
        .setTitle(title)
        .setDescription(desc);
};

exports.infoMsg = async (title, desc) => {
    return new EmbedBuilder()
        .setColor("#00FFCB")
        .setTitle(title)
        .setDescription(desc);
};

exports.warningMsg = async (title, desc) => {
    return new EmbedBuilder()
        .setColor("#FEE75C")
        .setTitle(title)
        .setDescription(desc);
};

exports.successMsg = async (title, desc) => {
    return new EmbedBuilder()
        .setColor("#57F287")
        .setTitle(title)
        .setDescription(desc);
};
