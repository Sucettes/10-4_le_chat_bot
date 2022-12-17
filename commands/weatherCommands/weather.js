const {
    SlashCommandBuilder
} = require('discord.js');
const axios = require('axios');
const getNextThreeDays = require('../../includes/functions/dateTimeUtils');
const embedMsg = require("../../component/embedMessages");

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
        const city = interaction.options.getString('city');
        await axios.get(`https://goweather.herokuapp.com/weather/${city}`)
            .then(async (response) => {
                if (response.data.temperature !== '') {
                    const nextThreeDays = getNextThreeDays();
                    let descriptionIcon = "";
                    switch (response.data.description) {
                        case "Sunny":
                            descriptionIcon = '☀'
                            break;
                        case "Light snow":
                            descriptionIcon = '🌨'
                            break;
                        case "Partly cloudy":
                            descriptionIcon = '⛅'
                            break;
                        case "Clear":
                            break;
                        case "Patchy rain possible":
                            descriptionIcon = '🌧'
                            break;
                        case "Heavy snow":
                            descriptionIcon = '🌨'
                            break;
                        case "Snow":
                            descriptionIcon = '🌨'
                            break;
                        case "Rain":
                            descriptionIcon = '🌧'
                            break;
                        case "Light rain shower":
                            descriptionIcon = '🌧'
                            break;
                        default:
                            break;
                    }
                    await interaction.reply({
                        embeds: [
                            await embedMsg.infoMsg("Weather", `**${city}**
                            Temperature:\xa0\xa0**${response.data.temperature}** 
                            Wind:\xa0\xa0**${response.data.wind}**
                            Description:\xa0\xa0**${response.data.description} ${descriptionIcon}**
    
                            Forecast:
                            **${nextThreeDays[0]}** T: ${response.data.forecast[0].temperature} W: ${response.data.forecast[0].wind}
                            **${nextThreeDays[1]}** T: ${response.data.forecast[1].temperature} W: ${response.data.forecast[1].wind}
                            **${nextThreeDays[2]}** T: ${response.data.forecast[2].temperature} W: ${response.data.forecast[2].wind}
                            `),
                        ],
                    });
                } else {
                    await interaction.reply({
                        embeds: [
                            await embedMsg.errorMsg("Weather", `The city is invalid, you may wanna try again using this format ex: **Regina, Saskatchewan**`),
                        ],
                    });
                }
            })
            .catch(async (error) => {
                if (error.response.data.message === 'NOT_FOUND') {
                    await interaction.reply({
                        embeds: [
                            await embedMsg.errorMsg("Weather", `The city is invalid, you may wanna try again using this format ex: **Regina, Saskatchewan**`),
                        ],
                    });
                }
            });
    }
}