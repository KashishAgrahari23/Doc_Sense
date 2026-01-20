export async function askGroq(documentText, question) {
  const prompt = `
You are a document assistant.

Answer the question strictly using ONLY the information from the document below.
If the answer is not present in the document, reply exactly with:
"Not present in the document."

Document:
${documentText}

Question:
${question}

Answer:
`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
