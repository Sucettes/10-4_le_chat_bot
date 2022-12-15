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
		.addStringOption(reasonOption =>
			reasonOption
				.setName('reason')
				.setDescription('Reason of the ban')
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const member = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason');
		let banOptions = {};
		if (reason) {
			banOptions.reason = reason;
		}
		interaction.guild.members.ban(member, banOptions)
			.then(async () => {
				await interaction.reply(`${member.username}#${member.discriminator} is now banned from the server !`);
			}).catch(async () => {
				await interaction.reply(`${member.username}#${member.discriminator} is already ban from the server !`);
			});
	}
}