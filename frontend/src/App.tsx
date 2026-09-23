import { useState } from "react";
import { Box } from "@mui/material";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatArea from "./components/ChatArea";
import QuestionInput from "./components/QuestionInput";
import { askQuestion } from "./services/Api";

import type { ChatMessage } from "./components/types/rag";

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleQuestion = async (question: string) => {
    if (!question.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    setMessages((previous) => [...previous, userMessage]);

    setChatHistory((previous) => [...previous, userMessage]);


    setLoading(true);

    try {
      // Backend API will be connected here

      const response = await askQuestion(question);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,

      };

      setMessages((previous) => [...previous, assistantMessage]);

    } catch (error) {
      console.error("Error asking question:", error);
    } finally {
      setLoading(false);
    }

  };


  const handleNewChat = () => {
      setMessages([]);
    };


  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        backgroundColor: "background.default",
      }}
    >
      <Sidebar
        onNewChat={handleNewChat}
        messages={chatHistory}
      />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <ChatArea
          messages={messages}
          loading={loading}
          onSuggestionClick={handleQuestion}
        />

        <QuestionInput
          onSubmit={handleQuestion}
          loading={loading}
        />
      </Box>
    </Box>
  );
}

export default App;