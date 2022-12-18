const fs = require('fs');
const blackList = ["/node_modules", "/.git"]
console.log(verifyJSStructure()); // Affiche 'true'

function verifyJSStructure() {
    const jsFiles = getAllFiles(__dirname);
    jsFiles.forEach(file => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (!data.startsWith('"use strict";')) {
                const splittedRoute = file.split("/");
                console.error(`\x1b[33m${splittedRoute[splittedRoute.length - 1]}:1 does not have a "use strict;"\x1b[0m`);
                return false;
            }

            // Validate single quote
            if (!validateDoubleQuotes(data)) {
                const splittedRoute = file.split("/");
                console.error(`\x1b[33m${splittedRoute[splittedRoute.length - 1]}: single quote detected !\x1b[0m`);
                return "Single Quote Detected";
            }

            if (validateEnding(data, file)) {
                console.log('e');
            }
            if ()
        });
    });
    return "Completed";
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
    // Use a regular expression to match string literals that use single quotes
    // This regular expression looks for single quotes that are not preceded by a backslash (\)
    // This allows us to ignore single quotes that are escaped within a string literal
    const singleQuoteStrings = code.match(/'(?:[^'\\]|\\.)*'/g);

    // If there are any single quote strings, return false
    if (singleQuoteStrings) {
        return false;
    }

    // Otherwise, return true
    return true;
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
                console.error(`\x1b[33m${splittedRoute[splittedRoute.length - 1]}:${i + 1} does not end with a semicolon\x1b[0m`);
            }
        }

    }
}