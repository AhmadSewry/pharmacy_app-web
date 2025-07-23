import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
import DialogActions from "@mui/material/DialogActions";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import AddCategory from "./categories for products/addCategory/AddCategoryComponent";
import { useTranslation } from "react-i18next";
import CategoryMedicine from "./categories for products/categoryDetails/Medicine";
import Medicine from "./categories for products/categoryDetails/Medicine";

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:5200/api/ProductCategory")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  const handleMenuClick = (event, category) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
    setEditName(category.name);
    setEditImageFile(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // DELETE
  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    handleMenuClose();
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5200/api/ProductCategory/${selectedCategory.cateogryID}`)
      .then(() => {
        setCategories(categories.filter((c) => c.cateogryID !== selectedCategory.cateogryID));
        closeDeleteDialog();
      })
      .catch((err) => console.log(err));
  };

  // EDIT
  const openEditDialog = () => {
    setIsEditDialogOpen(true);
    handleMenuClose();
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const onFileChange = (e) => {
    setEditImageFile(e.target.files[0]);
  };

  const saveEdit = () => {
    if (!editName.trim()) {
      alert("Name cannot be empty");
      return;
    }
  
    const formData = new FormData();
    formData.append("CategoryID", selectedCategory.cateogryID);
    formData.append("Name", editName);
    if (editImageFile) {
      formData.append("Image", editImageFile);
    }

    axios
      .put(`http://localhost:5200/api/ProductCategory/${selectedCategory.cateogryID}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setCategories(
          categories.map((c) =>
            c.cateogryID === selectedCategory.cateogryID
              ? { ...c, name: editName, image: res.data.image ?? c.image }
              : c
          )
        );
        closeEditDialog();
      })
      
      .catch((err) => {
        console.log(err);
        alert("Failed to update category");
      });
  };

  const { t } = useTranslation();

  const buildImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.jpg"; // صورة افتراضية لو ما فيه صورة
    // لو الصورة فيها رابط كامل (http/https) يرجع كما هو
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    // لو الصورة مسار نسبي
    return `http://localhost:5200/${imagePath}`;
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f5f7fa",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: "#333",
        }}
      >
        {t("Product Categories")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {categories.map((category) => (
          <Card
            key={category.cateogryID}
            sx={{
              width: 200,
              height: 220,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              position: "relative",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              },
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              const id = category.cateogryID;
              navigate("/AddProduct", { state: { id } });
              //console.log(id);
              
              // if (title === "medicines") navigate("/medicine");
              // else if (title === "baby & maternity care") navigate("/babycare");
              // else if (titlnavigate("/categoryDetails",{state:{id}});e === "first aid and medical supplies") navigate("/first-aid");
              // else if (title === "personal care & cosmetics") navigate("/cosmetics");
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => handleMenuClick(e, category)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "#fff",
                "&:hover": { backgroundColor: "#eee" },
                zIndex: 2,
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>

            <CardMedia
              component="img"
              src={buildImageUrl(category.image)}                      alt={category.name}
              sx={{
                height: 130,
                width: "100%",
                objectFit: "cover",
              }}
            />
            <CardContent sx={{ p: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, textTransform: "capitalize" }}
              >
                {category.name}
              </Typography>
            </CardContent>
          </Card>
        ))}

        <Medicine/>
        <AddCategory />
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={openEditDialog}>Edit</MenuItem>
        <MenuItem onClick={openDeleteDialog}>Delete</MenuItem>
      </Menu>

      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>هل أنت متأكد من حذف التصنيف؟</DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>إلغاء</Button>
          <Button color="error" onClick={confirmDelete}>
            نعم، احذف
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>تعديل التصنيف</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 320 }}>
          <TextField
            label="الاسم"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            fullWidth
          />
          <Button variant="outlined" component="label">
            اختر صورة جديدة
            <input type="file" hidden onChange={onFileChange} accept="image/*" />
          </Button>
          {editImageFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {editImageFile.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeEditDialog}>إلغاء</Button>
          <Button variant="contained" onClick={saveEdit}>
            حفظ التغييرات
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Category;
