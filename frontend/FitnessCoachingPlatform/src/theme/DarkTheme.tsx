import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff", // White for primary text/icons
    },
    secondary: {
      main: "#888888", // Grey for secondary elements
    },
    background: {
      default: "#121212", // Dark background color
      paper: "#1d1d1d", // Slightly lighter for cards, modals
    },
    text: {
      primary: "#ffffff", // Main text color
      secondary: "#aaaaaa", // Secondary text color
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Customize font family
    h6: {
      fontWeight: 600, // Header text weight
    },
  },
});

export default darkTheme;
