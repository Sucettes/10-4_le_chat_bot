"use strict";

const fs = require('node:fs');
const path = require('node:path');

exports.load = async (client) => {
    const eventsPath = path.join(__dirname);
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        client.on(event.name, (...args) => event.execute(...args));
    }
}