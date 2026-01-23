export function findRelevantChunk(chunks, question) {
  const qWords = question.toLowerCase().split(/\s+/);

  let bestIndex = 0;
  let maxScore = 0;

  chunks.forEach((chunk, index) => {
    const text = chunk.toLowerCase();
    let score = 0;

    qWords.forEach(word => {
      if (word.length > 2 && text.includes(word)) {
        score++;
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestIndex = index;
    }
  });

  return {
    chunk: chunks[bestIndex],
    index: bestIndex,
  };
}
