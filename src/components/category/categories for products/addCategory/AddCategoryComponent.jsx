import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import AddCategoryForm from "./AddCategoryScreen"; 

function AddCategory() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          width: 200,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.05)" },
          backgroundColor: "#e0f7fa",
        }}
      >
        <CardMedia
          component="img"
          src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
          alt="Add Category"
          sx={{
            height: 80,
            width: 80,
            objectFit: "contain",
            marginTop: "1rem",
          }}
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#00796b" }}
          >
            Add New Category
          </Typography>
        </CardContent>
      </Card>

      <AddCategoryForm open={open} onClose={handleClose} />
    </>
  );
}

export default AddCategory;
