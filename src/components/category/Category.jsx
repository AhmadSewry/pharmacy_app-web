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
    event.stopPropagation(); // مهم عشان ما يفتح كارد التنقل
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
        // تحديث الكاتيجوري بالاسم و الصورة (إذا عدلت الصورة يحدث imageUrl)
        setCategories(
          categories.map((c) =>
            c.cateogryID === selectedCategory.cateogryID
              ? { ...c, name: editName, imageUrl: res.data.imageUrl ?? c.imageUrl }
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
        {categories.map((category) => (
          <Card
            key={category.cateogryID}
            sx={{
              width: 200,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              position: "relative",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => {
              const title = category.name.toLowerCase();
              if (title === "medicines") navigate("/medicine");
              else if (title === "baby & maternity care") navigate("/babycare");
              else if (title === "first aid and medical supplies") navigate("/first-aid");
              else if (title === "personal care & cosmetics") navigate("/cosmetics");
            }}
          >
            {/* ثلاث نقاط القائمة */}
            <IconButton
              size="small"
              onClick={(e) => handleMenuClick(e, category)}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "#fff",
                "&:hover": { backgroundColor: "#eee" },
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>

            <CardMedia
              component="img"
              src={category.imageUrl}
              alt={category.name}
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
                {category.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <AddCategory />
      </Box>

      {/* قائمة الثلاث نقاط */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={openEditDialog}>Edit</MenuItem>
        <MenuItem onClick={openDeleteDialog}>Delete</MenuItem>
      </Menu>

      {/* حوار تأكيد الحذف */}
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

      {/* حوار التعديل */}
      <Dialog open={isEditDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>تعديل التصنيف</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 300 }}>
          <TextField
            label="الاسم"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            fullWidth
          />
          <Button variant="contained" component="label">
            اختر صورة جديدة
            <input type="file" hidden onChange={onFileChange} accept="image/*" />
          </Button>
          {editImageFile && <Typography variant="body2">{editImageFile.name}</Typography>}
        </DialogContent>
        <DialogActions>
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
