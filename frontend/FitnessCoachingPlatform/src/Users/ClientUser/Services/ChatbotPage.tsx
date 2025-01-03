import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserContext } from "../../../context/UserContext"; 

// ---------------------- THEME SETUP ----------------------
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF4500",
    },
    secondary: {
      main: "#FFA500",
    },
    background: {
      default: "#0A0A0A",
      paper: "#1B1B1B",
    },
    text: {
      primary: "#fff",
      secondary: "#ccc",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
});

// Styled components
const RootContainer = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundImage: "linear-gradient(to bottom, #0A0A0A, #1B1B1B, #FF4500)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  paddingTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ChatContainer = styled(Paper)(({ theme }) => ({
  width: "90%",
  maxWidth: 800,
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: "rgba(28, 28, 28, 0.9)",
  color: theme.palette.text.primary,
  borderRadius: 16,
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
}));

const ChatMessagesContainer = styled("div")(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const ChatInputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(1),
}));

// ChatMessage type
interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const ChatbotPage: React.FC = () => {
  const { userData } = useContext(UserContext); // Access user data from context
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loadingBotResponse, setLoadingBotResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const firstName = userData?.profile.firstName || "there"; // Default if no name is available

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send welcome message when chatbot loads
  useEffect(() => {
    const welcomeMessage = `Welcome ${firstName}! I’m Ackerra, your fitness support companion. I’m here to help you improve your fitness journey. What challenges are you currently facing? Let’s tackle them together!`;
    setMessages([{ sender: "bot", text: welcomeMessage }]);
  }, [firstName]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setUserInput("");
    setLoadingBotResponse(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: cannot connect to chatbot server." },
      ]);
    } finally {
      setLoadingBotResponse(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const renderMessage = (msg: ChatMessage, index: number) => {
    const isUser = msg.sender === "user";
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: isUser ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          margin: "8px 0",
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
        }}
      >
        <Box
          sx={{
            backgroundColor: isUser ? "#FF4500" : "#333",
            color: "#FFF",
            borderRadius: 2,
            padding: 1,
            maxWidth: "70%",
            wordWrap: "break-word",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {msg.text}
          </Typography>
        </Box>
      </motion.div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <ChatContainer>
          <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
            Ackerra Support Chatbot
          </Typography>

          <ChatMessagesContainer>
            <AnimatePresence>
              {messages.map((msg, index) => renderMessage(msg, index))}
            </AnimatePresence>
            {loadingBotResponse && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 2,
                }}
              >
                <CircularProgress color="primary" size={24} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </ChatMessagesContainer>

          <ChatInputContainer>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                backgroundColor: "#FFF",
                color: "#000", // Ensure the text is black
                borderRadius: 1,
                marginRight: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#FF8C00",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF4500",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF4500",
                  },
                  "& input": {
                    color: "#000", // Set input text color explicitly
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              sx={{
                minWidth: "80px",
                fontWeight: "bold",
                background:
                  "linear-gradient(to right, #FF4500, #FF8C00)",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #FF5733, #1C1C1C)",
                },
              }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </ChatInputContainer>
        </ChatContainer>
      </RootContainer>
    </ThemeProvider>
  );
};

export default ChatbotPage;
