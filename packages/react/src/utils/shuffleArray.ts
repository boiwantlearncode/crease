function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy of the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Get a random index between 0 and i
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

export default shuffleArray;