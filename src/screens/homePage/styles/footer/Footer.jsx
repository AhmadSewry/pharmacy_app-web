import { colors, styled, TextField, Typography } from "@mui/material";
import React from "react";

export const FooterTitle = styled(Typography)(() => ({
  textTransform: "uppercase",
  marginBottom: "1em",
}));
export const SubscribeTf = styled(TextField)(() => ({
  ".MuiInputLabel-root": {
    color: "black",
  },
  ".MuiInputLabel-root::before": {
    borderBottom: `1px solid ${"red"}`,
  },
}));
