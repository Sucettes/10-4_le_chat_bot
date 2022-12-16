const {
    SlashCommandBuilder, EmbedBuilder
} = require('discord.js');
const axios = require('axios');
const getNextThreeDays = require('../../functions/DateTime');
exports.command = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get the current weather for a city !')
        .addStringOption(cityOption =>
            cityOption
                .setName('city')
                .setDescription('City to get the weather from')
                .setRequired(true)),
    async execute(interaction) {
        const responseEmbed = new EmbedBuilder()
            .setColor(0x00ffcb)
            .setTitle("Weather")

        const city = interaction.options.getString('city');
        await axios.get(`https://goweather.herokuapp.com/weather/${city}`)
            .then(async (response) => {
                if (response.data) {
                    const nextThreeDays = getNextThreeDays();
                    let descriptionIcon = "";
                    switch (response.data.description) {
                        case "Sunny":
                            descriptionIcon = '☀'
                            break;
                        case "Light snow":
                            descriptionIcon = '🌨'
                            break;
                        default:
                            break;
                    }
                    responseEmbed
                        .setDescription(`**${city}**
                        Temperature:\xa0\xa0**${response.data.temperature}** 
                        Wind:\xa0\xa0**${response.data.wind}**
                        Description:\xa0\xa0**${response.data.description} ${descriptionIcon}**

                        Forecast:
                        **${nextThreeDays[0]}** T: ${response.data.forecast[0].temperature} W: ${response.data.forecast[0].wind}
                        **${nextThreeDays[1]}** T: ${response.data.forecast[1].temperature} W: ${response.data.forecast[1].wind}
                        **${nextThreeDays[2]}** T: ${response.data.forecast[2].temperature} W: ${response.data.forecast[2].wind}
                        `);
                    await interaction.reply({ embeds: [responseEmbed] });
                }
            })
            .catch(async (error) => {
                if (error.response.data.message === 'NOT_FOUND') {
                    responseEmbed.setDescription("The city is invalid, you may wanna try again.");
                    await interaction.reply({ embeds: [responseEmbed] });
                }
            });
    }
}