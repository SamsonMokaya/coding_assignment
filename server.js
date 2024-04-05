const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(bodyParser.json());

class RandomPasswordGenerator {
  constructor(upper, lower, numbers, special, minLength, maxLength) {
    this.upper = upper;
    this.lower = lower;
    this.numbers = numbers;
    this.special = special;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }

  generatePassword() {
    // Validate criteria
    if (!this.upper && !this.lower && !this.numbers && !this.special) {
      return "";
    }

    let password = "";
    let availableChars = "";
    let selectedChars = [];

    // Define character sets
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    // Include selected character sets based on criteria
    if (this.upper) {
      availableChars += uppercaseChars;
    }
    if (this.lower) {
      availableChars += lowercaseChars;
    }
    if (this.numbers) {
      availableChars += numberChars;
    }
    if (this.special) {
      if (specialChars === "") {
        // If specialChars is empty, include a default set of special characters
        availableChars += "!@#$%^&*()_+-=";
      } else {
        availableChars += specialChars;
      }
    }

    // Generate random length of password within range
    const length =
      Math.floor(Math.random() * (this.maxLength - this.minLength + 1)) +
      this.minLength;

    // Generate password
    for (let i = 0; i < length; i++) {
      // Randomly select a character from available characters
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      const randomChar = availableChars[randomIndex];
      selectedChars.push(randomChar);
    }

    // Shuffle the selected characters using Fisher-Yates shuffle algorithm
    for (let i = selectedChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedChars[i], selectedChars[j]] = [
        selectedChars[j],
        selectedChars[i],
      ];
    }

    // Convert array to string
    password = selectedChars.join("");

    return password;
  }
}

//generate password
app.post("/generate-password", (req, res) => {
  const { upper, lower, numbers, special, minLength, maxLength } = req.body;
  const passwordGenerator = new RandomPasswordGenerator(
    upper,
    lower,
    numbers,
    special,
    minLength,
    maxLength
  );

  const password = passwordGenerator.generatePassword();
  res.json({ password });
});


//decode message
app.get("/decode-message", (req, res) => {
  const filePath = req.query.file || "./message.txt";
  const decodedMessage = decodeMessage(filePath);
  res.json({ decodedMessage });
});

function decodeMessage(messageFile) {
  const lines = fs.readFileSync(messageFile, "utf8").trim().split("\n");
  const messageWords = [];

  for (let x = 0; x < 100; x++) {
    messageWords.push("");
  }

  lines.forEach((line) => {
    const [number, word] = line.split(" ");
    const lineNumber = parseInt(number);

    for (let x = 0; x < 100; x++) {
      if (lineNumber === (x * (x + 1)) / 2) {
        messageWords[x] = word;
        break;
      }
    }
  });

  const text = messageWords.filter((word) => word !== "").join(" ");
  return text;
}




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
