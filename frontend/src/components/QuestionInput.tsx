import {
  Send,
} from "@mui/icons-material";

import {
  Box,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";

interface QuestionInputProps{
  onSubmit:(question: string) => void;
  loading: boolean;
}

function QuestionInput({onSubmit, loading}:QuestionInputProps) {

  const [question, setQuestion] = useState("");

  const handleSubmit = () =>{
    const trimmedQuestion = question.trim();

    if(!trimmedQuestion || loading){
      return ;
    }

    onSubmit(trimmedQuestion);
    setQuestion("");

  };

  const handleKeyDown =(
    event : React.KeyboardEvent
  ) =>{
     
    if(event.key === "Enter" && !event.shiftKey){
      event.preventDefault();
      handleSubmit();
    }
  };


  return (
    <Box
      sx={{
        flexShrink: 0,
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        px: 2,
        py: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 1,
            p: 1,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            backgroundColor: "#FAF9F7",

            "&:focus-within": {
              borderColor: "primary.main",
              boxShadow:
                "0 0 0 2px rgba(107, 79, 58, 0.08)",
            },
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value) 
            }
            placeholder="Ask something about the Bhagavad Gita..."
            onKeyDown={handleKeyDown}
             variant="standard"
            // InputProps={{
            //   disableUnderline: true,
            // }}
            disabled={loading}
             sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              }}
          />

          <IconButton
            onClick={handleSubmit}
            disabled={!question.trim()|| loading}
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              backgroundColor: "primary.main",
              color: "white",

              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
             {loading ? (
              <CircularProgress
                size={20}
                sx={{ color: "white" }}
              />
            ) : (
            <Send fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          Answers are generated from the Bhagavad Gita
        </Typography>
      </Box>
    </Box>
  );
}

export default QuestionInput;