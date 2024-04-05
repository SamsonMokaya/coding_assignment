const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
