import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function IncDec({ quantity, onIncrement, onDecrement }) {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        sx={{
          borderRadius: 0,
          backgroundColor:
            theme.palette.mode === "light" ? "#107163" : "#3d3d3d",
          color: "white",
        }}
        onClick={onDecrement}
        disabled={quantity <= 1}
      >
        <RemoveIcon />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          px: 2,
          border: `1px solid ${theme.palette.divider}`,
          minWidth: "40px",
          textAlign: "center",
        }}
      >
        {quantity}
      </Typography>
      <IconButton
        sx={{
          borderRadius: 0,
          backgroundColor:
            theme.palette.mode === "light" ? "#107163" : "#3d3d3d",
          color: "white",
        }}
        onClick={onIncrement}
        disabled={quantity >= 100}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default IncDec;