const {
	SlashCommandBuilder,
	PermissionFlagsBits
} = require('discord.js');

exports.command = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them.')
		.addUserOption(option =>
			option
			.setName('target')
			.setDescription('The member to ban')
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const member = interaction.options.getUser('target');
		interaction.guild.members.ban(member)
			.then(async () => {
				await interaction.reply(`${member.username}#${member.discriminator} is now banned from the server !`);
			}).catch(async () => {
				await interaction.reply(`${member.username}#${member.discriminator} is already ban from the server !`);
			});
	}
}