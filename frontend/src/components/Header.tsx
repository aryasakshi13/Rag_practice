import { Circle } from "@mui/icons-material";

import {
  Box,
  Chip,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";



function Header() {

  const [online, setOnline] = useState(false);

  useEffect(() => {
  const checkBackend = async () => {
    try {
      const response = await fetch("https://rag-practice-2z8a.onrender.com");

      setOnline(response.ok);
    } catch {
      setOnline(false);
    }
  };

  checkBackend();

  const interval = setInterval(checkBackend, 10000);

  return () => clearInterval(interval);
}, []);

  return (
    <Box
      sx={{
        height: 72,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Left */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
          }}
        >
          Bhagavad Gita AI
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
          }}
        >
          Ask questions and explore the teachings
        </Typography>
      </Box>

      {/* Right */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Chip
          label="Hybrid RAG"
          size="small"
          variant="outlined"
        />

        <Chip
          icon={
            <Circle
              sx={{
                fontSize: "8px !important",
                 color: online
                    ? "#4CAF50 !important"
                    : "#f44336 !important",
              }}
            />
          }
          label={online ? "online" : "Offline"}
          size="small"
          variant="outlined"
        />
      </Box>
    </Box>
  );
}

export default Header;