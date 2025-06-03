import { Box, styled, Typography } from "@mui/material";
import React from "react";

export const PromotionContainer = styled(Box)((theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0px 20px 0px",
  overflow: "hidden",
  backgroundColor: "pink",
}));
export const MessageText = styled(Typography)((theme) => ({
  fontSize: "1.5rem",
  fontFamily: '"Montez", cursive',
  color: "white",
}));
