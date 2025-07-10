import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CategoriesData } from "./CategoriesData";
import AddCategory from "./categories for products/addCategory/AddCategoryComponent";

const Category = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: "#eef2f5",
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
        Product Categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {CategoriesData.map((category) => (
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
              if (title === "medicines") navigate("/medicine");
              else if (title === "baby & maternity care") navigate("/babycare");
              else if (title === "first aid and medical supplies")
                navigate("/first-aid");
              else if (title === "personal care & cosmetics")
                navigate("/cosmetics");
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
        <AddCategory />
      </Box>
    </Box>
  );
};

export default Category;
