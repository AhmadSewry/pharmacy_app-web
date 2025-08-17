import { Box, styled, Typography } from "@mui/material";
import React from "react";

export const PromotionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0px 20px 0px",
  overflow: "hidden",
  backgroundColor: theme.palette.mode === "light" ? "#33a18e" : "#1a936f",
}));

export const MessageText = styled(Typography)((theme) => ({
  fontSize: "1.5rem",
  fontFamily: '"Montez", cursive',
  color: "white",
}));
