# coding_assignment

## Algorithm

### Random password generator algorithm:

- **Initialization**:
  - Initializes an empty string to store the generated password.
  - Determines available characters based on specified criteria.

- **Validation**:
  - Checks if at least one type of character is required.
  - Returns an empty string if no criteria are specified.

- **Length Determination**:
  - Randomly determines password length within the specified range.

- **Character Selection**:
  - Randomly selects characters from available options for each position.

- **Shuffling**:
  - Applies Fisher-Yates shuffle algorithm to improve randomness.

- **Password Formation**:
  - Concatenates shuffled characters to form the final password.

### Decoding function
  - Reads a text file containing lines with a number followed by a word.
  - Interprets these lines as forming a "pyramid" structure.
  - Extracts the word associated with the last number on each "pyramid" line.
  - Concatenates these words to decode the hidden message.
  - Assumes numbers are in chronological order but placed randomly in the file.
