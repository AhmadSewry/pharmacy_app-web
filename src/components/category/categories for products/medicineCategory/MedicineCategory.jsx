import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { MedicineCategoriesData } from "./MedicineCategoriesData";

const MedicineCategory = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: "#f4f6f8",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "2rem",
          color: "#333",
        }}
      >
        Medicines Categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {MedicineCategoriesData.map((category) => (
          <Card
            key={category.id}
            sx={{
              width: 200,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => {
              const title = category.title.toLowerCase();
              if (title === "cold & flu") navigate("/medicine/cold-flu");
              else if (title === "pain relief")
                navigate("/medicine/pain-relief");
              else if (title === "allergy medications")
                navigate("/medicine/allergy-medications");
              else if (title === "vitamins & supplements")
                navigate("/medicine/vitamins-supplements");
              else if (title === "mental health")
                navigate("/medicine/mental-health");
            }}
          >
            <CardMedia
              component="img"
              src={category.image}
              alt={category.title}
              sx={{
                height: 120,
                objectFit: "cover",
                borderRadius: "12px 12px 0 0",
              }}
            />
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, textTransform: "capitalize" }}
              >
                {category.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MedicineCategory;
