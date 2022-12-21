"use strict";

const {EmbedBuilder} = require("discord.js");
const MsgPriority = require("../includes/enums/MsgPriority").MsgPriority;

exports.errorMsg = async (title, desc) => {
    let embed = new EmbedBuilder()
        .setColor("#ED4245")
        .setDescription(desc);
    if (title !== "") {
        embed.setTitle(title);
    }
    return embed;
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

exports.alertsMsg = async (priority, title = priority.toString(), description = "", user) => {
    let embed = new EmbedBuilder()
        .setTitle(title)
        .setTimestamp();

    switch (priority) {
        case MsgPriority.Important:
            embed.setColor("#ED4245");
            embed.setDescription(`@everyone ${description}`);
            break;
        case MsgPriority.Medium:
            embed.setColor("#FEE75C");
            embed.setDescription(`@everyone ${description}`);
            break;
        case MsgPriority.Low:
            embed.setColor("#57F287")
                .setDescription(description);
            break;
        case MsgPriority.Info:
            embed.setColor("#00FFCB")
                .setDescription(description);
            break;
    }

    if (user) {
        embed.setFooter({text: user});
    }

    return embed;
};
