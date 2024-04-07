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
app.get("/decode", (req, res) => {
  const filePath = "./cr.txt";
  const decodedMessage = decodeMessage(filePath);
  res.json({ decodedMessage });
});

function decodeMessage(messageFile) {
  const lines = fs.readFileSync(messageFile, "utf8").trim().split("\n");

  // Filter out empty lines and lines with NaN values
  const filteredLines = lines.filter((line) => {
    const [number] = line.split(" ");
    return !isNaN(number);
  });

  // Remove '\r' characters from each line
  const cleanedLines = filteredLines
    .map((line) => line.replace(/\r/g, ""))
    .filter(Boolean);

  const sortedLines = cleanedLines.sort((a, b) => {
    const [numberA] = a.split(" ");
    const [numberB] = b.split(" ");
    return parseInt(numberA) - parseInt(numberB);
  });

  // Determine the number of rows for the pyramid
  const numRows = Math.ceil(Math.sqrt(2 * sortedLines.length + 0.25) - 0.5);

  // Initialize an array to represent the pyramid structure
  const pyramid = [];
  for (let i = 0; i < numRows; i++) {
    pyramid.push(Array(i + 1).fill(""));
  }

  // Populate the pyramid array with the sorted lines
  let index = 0;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col <= row; col++) {
      if (index < sortedLines.length) {
        pyramid[row][col] = sortedLines[index++];
      }
    }
  }

  // Select the far-right numbers from the pyramid as indexes
  const farRightIndexes = pyramid
    .map((row) => row[row.length - 1])
    .filter(Boolean);

  // Get the words corresponding to the far-right indexes
  const selectedWords = farRightIndexes.map((item) => {
    const parts = item.split(" ");
    return parts.slice(1).join(" ");
  });

  // Join the selected words into a single string
  const decodedMessage = selectedWords.join(" ");

  // Return the decoded message
  return decodedMessage;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
