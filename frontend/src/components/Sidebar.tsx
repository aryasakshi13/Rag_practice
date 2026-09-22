import {
  Add,
  AutoStories,
  InfoOutlined,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import type { ChatMessage } from "./types/rag";

interface SidebarProps {
  onNewChat: () => void;
   messages: ChatMessage[];
}

function Sidebar({ onNewChat, messages }: SidebarProps) {
      
  const recentChats = messages
    .filter((message) => message.role === "user")
    .slice(-5)
    .reverse();

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 72,
          px: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
        >
          ॐ
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Gita AI
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Bhagavad Gita Assistant
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* New Chat */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Add />}
          onClick={onNewChat}
        >
          New Chat
        </Button>
      </Box>

      {/* Recent Chats */}
      <Box sx={{ px: 1.5 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            px: 1,
            fontWeight: 600,
            letterSpacing: 0.7,
          }}
        >
          RECENT CHATS
        </Typography>

        <List sx={{ mt: 0.5 }}>

         {recentChats.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                px: 1,
                py: 1.5,
                fontSize: 13,
              }}
            >
              No recent chats
            </Typography>
          ) : (
            recentChats.map((chat) => (
              <ListItemButton
                key={chat.id}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                  }}
                >
                  <AutoStories fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary={chat.content}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 14,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
              </ListItemButton>
            ))
          )}
        </List>
      </Box>

      {/* Bottom */}
      <Box
        sx={{
          mt: "auto",
          p: 1.5,
        }}
      >
        <Divider sx={{ mb: 1 }} />

        <ListItemButton
          sx={{
            borderRadius: 2,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
            }}
          >
            <InfoOutlined fontSize="small" />
          </ListItemIcon>

          <ListItemText
            primary="About RAG"
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: 14,
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}

export default Sidebar;