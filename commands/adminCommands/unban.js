const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder
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
		const responseEmbed = new EmbedBuilder()
			.setColor(0x00ffcb)

		const member = interaction.options.getUser('target');

		await interaction.guild.members.unban(member)
			.then(async () => {
				responseEmbed.setDescription(`${member.username}#${member.discriminator} is now unban from the server !`);
				await interaction.reply({ embeds: [responseEmbed] });
			}).catch(async (err) => {
				if (err.status == 403) {
					responseEmbed.setDescription(`You are not allowed to unban this member !`);
				} else {
					responseEmbed.setDescription(`${member.username}#${member.discriminator} isn't ban from the server !`);
				}
				await interaction.reply({ embeds: [responseEmbed] });
			});
	}
}