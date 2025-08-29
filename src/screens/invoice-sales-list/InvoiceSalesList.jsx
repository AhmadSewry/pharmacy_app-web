import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Button,
  Collapse,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Delete,
  Edit,
  ExpandMore,
} from "@mui/icons-material";

function SalesListView() {
  const [sales, setSales] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [employeesMap, setEmployeesMap] = useState({});
  const [openIndexes, setOpenIndexes] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);
  const [saleToEdit, setSaleToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [salesRes, employeesRes, productsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/Sale", config),
        axios.get("http://localhost:5000/api/Employee", config),
        axios.get("http://localhost:5000/api/Product", config),
      ]);

      const employeesMapTemp = {};
      employeesRes.data.forEach((e) => {
        employeesMapTemp[e.employeeId] = e.name;
      });
      setEmployeesMap(employeesMapTemp);

      const productsDictionary = {};
      productsRes.data.forEach((p) => {
        productsDictionary[p.productId ?? p.productID] = p.name;
      });
      setProductsMap(productsDictionary);

      const salesWithNames = salesRes.data.map((s) => ({
        ...s,
        employeeName: employeesMapTemp[s.employeeName] || `#${s.employeeName}`,
      }));

      setSales(salesWithNames);
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
      showSnackbar("فشل في تحميل الفواتير", "error");
    }
  };

  const toggleDetails = async (idx) => {
    if (openIndexes[idx]) {
      setOpenIndexes((prev) => ({ ...prev, [idx]: false }));
      return;
    }

    const sale = sales[idx];
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(
        `http://localhost:5000/api/Sale/${sale.id}`,
        config
      );
      const detailedSale = res.data;

      setSales((prev) => {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          saleItems: detailedSale.saleItems,
        };
        return updated;
      });

      setOpenIndexes((prev) => ({ ...prev, [idx]: true }));
    } catch (error) {
      console.error("خطأ في جلب تفاصيل الفاتورة:", error);
      showSnackbar("فشل في جلب تفاصيل الفاتورة", "error");
    }
  };

  const openDeleteDialog = (saleID, idx) => {
    setSaleToDelete({ saleID, idx });
    setDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDialogOpen(false);
    setSaleToDelete(null);
  };

  const openEditDialog = async (saleID, idx) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(
        `http://localhost:5000/api/Sale/${saleID}`,
        config
      );
      const saleData = res.data;

      setEditFormData({
        saleID: saleData.id,
        employeeID: saleData.employeeID,
        saleDate: saleData.saleDate ? saleData.saleDate.split("T")[0] : "",
        totalAmount: saleData.totalAmount ?? 0,
        saleItems:
          saleData.saleItems?.map((item) => ({
            saleItemID: item.id,
            productID: item.productID,
            quantity: item.quantity,
            price: item.price || 0,
          })) || [],
      });

      setSaleToEdit({ saleID, idx, fullData: saleData });
      setEditDialogOpen(true);
    } catch (error) {
      console.error("خطأ في جلب بيانات الفاتورة للتعديل:", error);
      showSnackbar("فشل في جلب بيانات الفاتورة", "error");
    }
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setSaleToEdit(null);
    setEditFormData({});
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (itemIndex, field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      saleItems: prev.saleItems.map((item, idx) =>
        idx === itemIndex ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const updateData = {
        id: editFormData.saleID,
        employeeID: editFormData.employeeID,
        saleDate: editFormData.saleDate,
        totalAmount: parseFloat(editFormData.totalAmount) || 0,
        saleItems: editFormData.saleItems.map((item) => ({
          id: item.saleItemID,
          productID: parseInt(item.productID),
          quantity: parseInt(item.quantity) || 1,
          price: parseFloat(item.price) || 0,
        })),
      };

      await axios.put(
        `http://localhost:5000/api/Sale/${editFormData.saleID}`,
        updateData,
        config
      );

      setSales((prev) => {
        const updated = [...prev];
        updated[saleToEdit.idx] = {
          ...updated[saleToEdit.idx],
          employeeID: updateData.employeeID,
          employeeName:
            employeesMap[updateData.employeeID] || `#${updateData.employeeID}`,
          saleDate: updateData.saleDate,
          totalAmount: updateData.totalAmount,
          saleItems: editFormData.saleItems,
        };
        return updated;
      });

      showSnackbar("تم حفظ التعديلات بنجاح", "success");
      closeEditDialog();
    } catch (error) {
      console.error("خطأ في حفظ التعديلات:", error);
      showSnackbar("فشل في حفظ التعديلات، حاول مرة أخرى", "error");
    }
  };

  const confirmDelete = async () => {
    if (!saleToDelete) return;

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.delete(
        `http://localhost:5000/api/Sale/${saleToDelete.saleID}`,
        config
      );

      setSales((prev) => prev.filter((_, i) => i !== saleToDelete.idx));

      setOpenIndexes((prev) => {
        const copy = { ...prev };
        delete copy[saleToDelete.idx];
        return copy;
      });

      showSnackbar("تم حذف الفاتورة بنجاح", "success");
    } catch (error) {
      console.error("خطأ في حذف الفاتورة:", error);
      showSnackbar("فشل في حذف الفاتورة، حاول مرة أخرى", "error");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4, mb: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        قائمة المبيعات
      </Typography>

      {sales.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }}>
          لا توجد فواتير لعرضها
        </Typography>
      )}

      {sales.map((sale, idx) => (
        <Paper
          key={idx}
          elevation={3}
          sx={(theme) => ({
            mb: 3,
            p: 2,
            borderRadius: 2,
            direction: "rtl",
            bgcolor: theme.palette.mode === "light" ? "white" : "gray",
          })}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">
              فاتورة #{sale.id} - الموظف: {sale.employeeName}
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                color="error"
                startIcon={<Delete />}
                onClick={() => openDeleteDialog(sale.id, idx)}
              >
                حذف الفاتورة
              </Button>

              <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<Edit />}
                onClick={() => openEditDialog(sale.id, idx)}
              >
                تعديل الفاتورة
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={() => toggleDetails(idx)}
                endIcon={
                  openIndexes[idx] ? <KeyboardArrowUp /> : <KeyboardArrowDown />
                }
              >
                {openIndexes[idx] ? "إخفاء التفاصيل" : "عرض التفاصيل"}
              </Button>
            </Box>
          </Box>

          <Typography sx={{ mt: 1 }}>
            التاريخ:{" "}
            {sale.saleDate
              ? new Date(sale.saleDate).toLocaleDateString()
              : "-"}
          </Typography>
          <Typography>المجموع: {sale.totalAmount ?? 0}</Typography>

          <Collapse
            in={openIndexes[idx]}
            timeout="auto"
            unmountOnExit
            sx={{ mt: 2 }}
          >
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                المنتجات:
              </Typography>
              <Table size="small" sx={{ bgcolor: "white", borderRadius: 1 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#e0f7fa" }}>
                    <TableCell align="center">معرّف المنتج</TableCell>
                    <TableCell align="center">اسم المنتج</TableCell>
                    <TableCell align="center">الكمية</TableCell>
                    <TableCell align="center">السعر</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sale.saleItems?.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">{item.productID}</TableCell>
                      <TableCell align="center">
                        {productsMap[item.productID] || "-"}
                      </TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </Paper>
      ))}

      {/* Dialog تأكيد الحذف */}
      <Dialog open={dialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          هل أنت متأكد من حذف الفاتورة رقم {saleToDelete?.saleID}؟
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>إلغاء</Button>
          <Button color="error" onClick={confirmDelete}>
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog تعديل الفاتورة */}
      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        maxWidth="lg"
        fullWidth
        sx={{ "& .MuiDialog-paper": { height: "90vh" } }}
      >
        <DialogTitle>تعديل الفاتورة رقم {editFormData.saleID}</DialogTitle>
        <DialogContent sx={{ overflow: "auto" }}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            بيانات الفاتورة الأساسية
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>الموظف</InputLabel>
                <Select
                  value={editFormData.employeeID || ""}
                  label="الموظف"
                  onChange={(e) =>
                    handleEditFormChange("employeeID", e.target.value)
                  }
                >
                  {Object.entries(employeesMap).map(([id, name]) => (
                    <MenuItem key={id} value={parseInt(id)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="تاريخ البيع"
                type="date"
                value={editFormData.saleDate || ""}
                onChange={(e) =>
                  handleEditFormChange("saleDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="المجموع الكلي"
                type="number"
                value={editFormData.totalAmount || 0}
                onChange={(e) =>
                  handleEditFormChange("totalAmount", e.target.value)
                }
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            تفاصيل المنتجات
          </Typography>

          {editFormData.saleItems?.map((item, itemIndex) => (
            <Accordion key={itemIndex} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  المنتج #{itemIndex + 1}:{" "}
                  {productsMap[item.productID] || "غير محدد"}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  الكمية: {item.quantity}, السعر: {item.price}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="الكمية"
                      type="number"
                      value={item.quantity || ""}
                      onChange={(e) =>
                        handleItemChange(itemIndex, "quantity", e.target.value)
                      }
                      size="small"
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="السعر"
                      type="number"
                      value={item.price || 0}
                      onChange={(e) =>
                        handleItemChange(itemIndex, "price", e.target.value)
                      }
                      size="small"
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>إلغاء</Button>
          <Button color="primary" variant="contained" onClick={handleSaveEdit}>
            حفظ التعديلات
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SalesListView;