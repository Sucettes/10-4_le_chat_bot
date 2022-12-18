const {
	SlashCommandBuilder,
	PermissionFlagsBits
} = require('discord.js');
const embedMsg = require("../../component/embedMessages");

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
				await interaction.reply({ embeds: [await embedMsg.successMsg('', `${member.username}#${member.discriminator} is now banned from the server !`)] });
			}).catch(async (err) => {
				if (err.status == 403) {
					await interaction.reply({ embeds: [await embedMsg.errorMsg('', `You are not allowed to ban this member !`)] });
				} else {
					await interaction.reply({ embeds: [await embedMsg.errorMsg('', `${member.username}#${member.discriminator} is already ban from the server !`)] });
				}
			});
	}
}