import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  openAIApiKey: process.env.GROQ_API_KEY,
  modelName: "llama-3.1-8b-instant",
  temperature: 0,
  configuration: {
    baseURL: "https://api.groq.com/openai/v1",
  },
});

const prompt = new PromptTemplate({
  template: `
You are a document assistant.

Answer the question strictly using ONLY the information from the document below.
If the answer is not present in the document, reply exactly with:
"Not present in the document."

Document:
{document}

Question:
{question}

Answer:
`,
  inputVariables: ["document", "question"],
});

export async function askWithLangChain(document, question) {
  const chain = prompt.pipe(model);
  const response = await chain.invoke({
    document,
    question,
  });

  return response.content;
}
