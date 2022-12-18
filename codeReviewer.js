"use strict";

const fs = require("fs");

const blackList = ["/node_modules", "/.git"]
const jsFiles = getAllFiles(__dirname);
console.clear();
verifyJSStructure();

function verifyJSStructure() {
    jsFiles.forEach(file => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (!data.startsWith('"use strict";')) {
                const splittedRoute = file.split("/");
                console.warn(`\x1b[33m${splittedRoute[splittedRoute.length - 1]}:1 does not have a "use strict";\x1b[0m`);
            }

            // Validate single quote
            let foundSingleQuotes = validateDoubleQuotes(data);
            if (foundSingleQuotes != -1) {
                const splittedRoute = file.split("/");
                foundSingleQuotes.forEach(fsq => {
                    console.warn(`\x1b[33m${splittedRoute[splittedRoute.length - 1]}:${fsq} single quote detected\x1b[0m`);
                });
            }
            validateEnding(data, file)
        });
    });
}

function getAllFiles(dir) {
    let results = [];
    let error = false;
    blackList.forEach(blackListItem => {
        if (dir === __dirname + blackListItem) {
            error = true;
        }
    });
    if (!error) {
        const files = fs.readdirSync(dir);
        files.forEach(function (file) {
            file = dir + '/' + file;
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(getAllFiles(file));
            } else if (file.endsWith('.js')) {
                results.push(file);
            }
        });
    }
    return results;
}

function validateDoubleQuotes(code) {
    const singleQuoteStrings = code.match(/'(?:[^'\\]|\\.)*'/g);
    if (singleQuoteStrings) {
        let arrayLines = new Array();
        singleQuoteStrings.forEach(sqs => {
            const lines = code.split("\n");
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes(sqs)) {
                    arrayLines.push(i + 1);
                }
            }
        });
        return arrayLines;
    }
    return -1;
}

function validateEnding(data, file) {
    let inMultilineString = false;
    let inDestructuringAssignment = false;

    const lines = data.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Ignore blank lines and lines that only contain a comment
        if (line.trim() === '' || line.trim().startsWith('//')) {
            continue;
        }

        // Check if the line is the start or end of a multiline string
        if (line.trim().startsWith('`') || line.trim().endsWith('`')) {
            inMultilineString = !inMultilineString;
            continue;
        }

        // Check if the line starts a destructuring assignment
        if (line.trim().startsWith('const {')) {
            inDestructuringAssignment = true;
        }

        // If we're inside a multiline string or a destructuring assignment, don't check for a semicolon
        if (inMultilineString || inDestructuringAssignment) {
            // Check if the line ends a destructuring assignment
            if (line.trim().endsWith('}')) {
                inDestructuringAssignment = false;
            }
            continue;
        }
        // Validation if and closing brackets
        if (line.trim().startsWith('if') || line.trim().startsWith('}')) {
            continue;
        }

        // Escape useless opening brackets
        if (line.trim().endsWith('{')) {
            continue;
        }

        // Check if the line ends with a semicolon
        if (!line.trim().endsWith(';')) {
            if (!lines[i - 1].trim().endsWith("{")) {
                const splittedRoute = file.split("/");
                console.warn(`\x1b[33m${splittedRoute[splittedRoute.length - 1]}:${i + 1} does not end with a semicolon\x1b[0m`);
            }
        }
    }
}