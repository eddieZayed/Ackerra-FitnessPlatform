import React from "react";
import { CircularProgress } from "@mui/material";
import FitbitIcon from "@mui/icons-material/Fitbit";

interface LoadingIndicatorProps {
  message?: string;
  style?: React.CSSProperties;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = "Loading, please wait...", style }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay
        zIndex: 1000, // Ensure it's above other elements
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <FitbitIcon
          sx={{
            fontSize: 60,
            color: "#FF5722",
            animation: "spin 1.5s linear infinite",
          }}
        />
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: "#FF5722",
            position: "absolute",
            animation: "fadeIn 1.5s ease-in-out infinite",
          }}
        />
      </div>
      <p
        style={{
          fontSize: "18px",
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {message}
      </p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingIndicator;
