const {
	SlashCommandBuilder,
	PermissionFlagsBits
} = require('discord.js');

exports.command = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Select a member to unban.')
		.addUserOption(option =>
			option
			.setName('target')
			.setDescription('The user to unban')
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const member = interaction.options.getUser('target');
		await interaction.guild.members.unban(member)
			.then(async () => {
				await interaction.reply(`${member.username}#${member.discriminator} is now unban from the server !`);
			}).catch(async () => {
				await interaction.reply(`${member.username}#${member.discriminator} is not ban from the server !`);
			});
	}
}