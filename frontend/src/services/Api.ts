export interface AskQuestionResponse {
  answer: string;
  sources?: Source[];
}

export interface Source {
  chunkIndex: number;
  documentName: string;
  content?: string;
  rerankScore?: number;
  source?: string;
}

const API_URL = "https://rag-practice-2z8a.onrender.com";

export async function askQuestion(
  question: string
): Promise<AskQuestionResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from server");
  }

  return response.json();
}