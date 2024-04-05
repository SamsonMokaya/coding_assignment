# coding_assignment

Algorithm

## Random password generator algorithm:

    Initialization:
        The algorithm initializes an empty string to store the generated password.
        It determines the available characters based on the specified criteria, including uppercase letters, lowercase letters, numbers, and special characters.

    Validation:
        The algorithm checks if at least one type of character (uppercase, lowercase, numbers, or special) is required for the password generation.
        If none are required, the algorithm returns an empty string, as there are no criteria to generate a password.

    Length Determination:
        The algorithm randomly determines the length of the password within the specified range (minimum and maximum length).

    Character Selection:
        For each character position in the password, the algorithm randomly selects a character from the available characters determined earlier.
        This ensures that the password includes characters from the specified criteria.

    Shuffling:
        After selecting the characters, the algorithm shuffles them to improve randomness.
        This is done using the Fisher-Yates shuffle algorithm, ensuring that the characters are distributed randomly throughout the password.

    Password Formation:
        Finally, the shuffled characters are concatenated to form the final password.

## Decoding function
    This function reads a text file containing lines with a number followed by a word. 
    It interprets these lines as forming a "pyramid" structure, where each line adds one
    more number than the previous one. The function then extracts the word associated with
    the last number on each "pyramid" line. Finally, it concatenates these words together
    effectively decoding the hidden message represented by the numbers and words in the file.
    NB: The function assumes that the numbers are in a chronological order but placed
    randomly in the file.
