import { Circle } from "@mui/icons-material";

import {
  Box,
  Chip,
  Typography,
} from "@mui/material";

function Header() {
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
                color: "#4CAF50 !important",
              }}
            />
          }
          label="Online"
          size="small"
          variant="outlined"
        />
      </Box>
    </Box>
  );
}

export default Header;