import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AddMedicineCategoryComponentForm from "../medicineCategory/MedicineCategoryScreens/AddMedicineCategoryComponentForm";
import { useLocation } from "react-router-dom";
import AddMedicineCategoryComponent from "../medicineCategory/MedicineCategoryScreens/AddMedicineCategoryComponent";

const CategoryDetails = () => {
  // const location = useLocation();
  // const { id } = location.state;
  //console.log(id);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    //console.log(category);
    axios
      .get(`http://localhost:5200/api/MedicineCategory`)
      .then((response) => {
        //console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicine categories:", error);
      });
  };

  const handleMenuOpen = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      axios
        .delete(
          `http://localhost:5200/api/MedicineCategory/${selectedCategory.cateogryID}`
        )
        .then(() => {
          setCategories((prev) =>
            prev.filter((cat) => cat.cateogryID !== selectedCategory.cateogryID)
          );
          setOpenDialog(false);
          setSelectedCategory(null);
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "2rem",
          color: "#1976d2",
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
        {(categories==null?[]:categories).map((category) => {
          console.log(category);
          return (
            <Card
              key={category.cateogryID}  
              sx={{
                width: 220,
                position: "relative",
                borderRadius: "16px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                },
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleMenuOpen(event, category);
                }}
              >
                <MoreVertIcon />
              </IconButton>

              <CardMedia
                component="img"
                src={category.image}
                alt={category.name}
                sx={{
                  height: 140,
                  objectFit: "cover",
                  borderRadius: "16px 16px 0 0",
                }}
                onClick={() => {
                  const id = category.cateogryID;
                  navigate("/AddMedicine", { state: { id } });
                //   const id = category;
                  console.log(id);
                //   if (title === "cold & flu") navigate("/medicine/cold-flu");
                //   else if (title === "pain relief")
                //     navigate("/medicine/pain-relief");
                //   else if (title === "allergy medications")
                //     navigate("/medicine/allergy-medications");
                //   else if (title === "vitamins & supplements")
                //     navigate("/medicine/vitamins-supplements");
                //   else if (title === "mental health")
                //     navigate("/medicine/mental-health");
                 }}
              />
              <CardContent
                sx={{
                  backgroundColor: "#fff",
                }}
                  // onClick={() => {
                  //   const title = category.id;
                  //   if (title === "cold & flu") navigate("/medicine/cold-flu");
                  //   else if (title === "pain relief")
                  //     navigate("/medicine/pain-relief");
                  //   else if (title === "allergy medications")
                  //     navigate("/medicine/allergy-medications");
                  //   else if (title === "vitamins & supplements")
                  //     navigate("/medicine/vitamins-supplements");
                  //   else if (title === "mental health")
                  //     navigate("/medicine/mental-health");
                  // }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    textTransform: "none",
                    color: "#333",
                  }}
                >
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
        <AddMedicineCategoryComponent />
        {/* Menu for options */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>

        {/* Confirm Delete Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete "{selectedCategory?.name}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              No
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
            >
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CategoryDetails;
