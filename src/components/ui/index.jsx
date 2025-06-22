import { Box, colors, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { clamp } from "./clamp";
import { lightGreen } from "@mui/material/colors";

function IncDec() {
  const theme = useTheme();
  const clampValue = clamp(1, 10);
  const [value, setValue] = useState(1);
  return (
    <Box display={"flex"}>
      <IconButton
        sx={{
          borderRadius: 0,
          backgroundColor:
            theme.palette.mode === "light" ? "#107163" : "#3d3d3d",
        }}
        onClick={() => setValue(clampValue(value - 1))}
      >
        <RemoveIcon></RemoveIcon>
      </IconButton>
      <Typography
        variant="h6"
        sx={{ border: `1px solid ${colors.blue}`, p: 2 }}
      >
        {value}
      </Typography>
      <IconButton
        sx={{
          borderRadius: 0,
          backgroundColor:
            theme.palette.mode === "light" ? "#107163" : "#3d3d3d",
        }}
        onClick={() => setValue(clampValue(value + 1))}
      >
        <AddIcon></AddIcon>
      </IconButton>
    </Box>
  );
}

export default IncDec;
