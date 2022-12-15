const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');

exports.command = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Select a member to kick from the server.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to kick')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const member = interaction.options.getUser('target');
        interaction.guild.members.kick(member)
            .then(async () => {
                await interaction.reply(`${member.username}#${member.discriminator} has been kick from the server !`);
            }).catch(async () => {
                await interaction.reply(`${member.username}#${member.discriminator} is not on the server !`);
            });
    }
}