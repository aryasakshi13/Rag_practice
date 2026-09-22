import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import type { ChatMessage } from "./types/rag";

interface ChatAreaProps {
  messages: ChatMessage[];
  loading: boolean;
}

function ChatArea({messages, loading}: ChatAreaProps) {
  const suggestions = [
    "What is Karma?",
    "What is Dharma?",
    "What is Yoga?",
    "What does Gita say about the soul?",
  ];
  
  if(messages.length===0){
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
        px: 3,
        py: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            width: 68,
            height: 68,
            borderRadius: 3,
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            mb: 3,
            boxShadow:
              "0 6px 20px rgba(107, 79, 58, 0.18)",
          }}
        >
          ॐ
        </Box>

        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: "1.8rem",
              md: "2.2rem",
            },
            letterSpacing: "-0.02em",
          }}
        >
          Ask the Bhagavad Gita
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            mt: 1.5,
            maxWidth: 560,
            color: "text.secondary",
            lineHeight: 1.7,
          }}
        >
          Explore the teachings, concepts, and wisdom
          of the Bhagavad Gita using an AI-powered
          retrieval system.
        </Typography>

        {/* Suggestions */}
        <Stack
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "row",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 2,
                px: 2,
                py: 0.8,
              }}
            >
              {suggestion}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

// Show chat messages after the user asks a question
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        px: 3,
        py: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
        }}
      >
        {messages.map((message: ChatMessage) => (
          <Box
            key={message.id}
            sx={{
              mb: 3,
              display: "flex",
              justifyContent:
                message.role === "user"
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "80%",
                px: 2,
                py: 1.5,
                borderRadius: 3,
                backgroundColor:
                  message.role === "user"
                    ? "primary.main"
                    : "background.paper",
                color:
                  message.role === "user"
                    ? "white"
                    : "text.primary",
                border:
                  message.role === "assitant"
                    ? "1px solid"
                    : "none",
                borderColor: "divider",
              }}
            >
              <Typography
                sx={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.7,
                }}
              >
                {message.content}
              </Typography>
            </Box>
          </Box>
        ))}

        {/* Loading */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
            }}
          >
            <CircularProgress size={20} />

            <Typography color="text.secondary">
              Searching the Bhagavad Gita...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}


export default ChatArea;