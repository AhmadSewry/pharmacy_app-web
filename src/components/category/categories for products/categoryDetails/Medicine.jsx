import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import categoryMedicineImage from "../../../../images/categoryMedicine.jpg";

function Medicine() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/medicine");
  };

  return (
  
    <Card
      onClick={handleClick}
      sx={{
        width: 200,
        height: 250,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      {/* الاسم أعلى الكارت */}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 500,
          padding: "8px",
          textAlign: "center",
        }}
      >
        Medicine
      </Typography>

      {/* الصورة */}
      <CardMedia
        component="img"
        src={categoryMedicineImage}
        image="../../../../images/categoryMedicine.jpg"
        alt="Medicine"
        sx={{
          height: 100,
          width: "100%",
          objectFit: "contain",
        }}
      />

      {/* الاسم أسفل الكارت */}
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, textAlign: "center" }}
        >
          Medicine
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Medicine;
