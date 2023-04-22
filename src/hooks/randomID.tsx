export const randomId = () => {
  // Possible letters
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Generate a random string of two letters
  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];

  // Generate a random string of four numbers
  const randomNumbers = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return randomLetters + randomNumbers;
};
