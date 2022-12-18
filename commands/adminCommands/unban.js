const {
	SlashCommandBuilder,
	PermissionFlagsBits
} = require('discord.js');
const embedMsg = require("../../component/embedMessages");

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
				await interaction.reply({ embeds: [await embedMsg.successMsg("", `${member.username}#${member.discriminator} is now unban from the server !`)] });
			}).catch(async (err) => {
				if (err.status == 403) {
					await interaction.reply({ embeds: [await embedMsg.errorMsg("", `You are not allowed to unban this member !`)] });
				} else {
					await interaction.reply({ embeds: [await embedMsg.errorMsg("", `${member.username}#${member.discriminator} isn't ban from the server !`)] });
				}
			});
	}
}