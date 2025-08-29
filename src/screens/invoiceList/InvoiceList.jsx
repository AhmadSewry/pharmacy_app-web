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

function PurchasesListView() {
  const [purchases, setPurchases] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [suppliersMap, setSuppliersMap] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [openIndexes, setOpenIndexes] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [purchaseToDelete, setPurchaseToDelete] = useState(null);
  const [purchaseToEdit, setPurchaseToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [purchasesRes, suppliersRes, productsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/Purchase"),
        axios.get("http://localhost:5000/api/Supplier"),
        axios.get("http://localhost:5000/api/Product"),
      ]);

      const suppliersMapTemp = {};
      suppliersRes.data.forEach((s) => {
        suppliersMapTemp[s.supplierId ?? s.supplierID] = s.name;
      });
      setSuppliersMap(suppliersMapTemp);

      const productsDictionary = {};
      productsRes.data.forEach((p) => {
        productsDictionary[p.productId ?? p.productID] = p.name;
      });
      setProductsMap(productsDictionary);
      setAllProducts(productsRes.data);

      const purchasesWithNames = purchasesRes.data.map((p) => ({
        ...p,
        supplierName:
          suppliersMapTemp[p.supplierId ?? p.supplierID] ||
          `#${p.supplierId ?? p.supplierID}`,
      }));

      setPurchases(purchasesWithNames);
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

    const purchase = purchases[idx];
    try {
      const res = await axios.get(
        `http://localhost:5000/api/Purchase/${purchase.purchaseID}`
      );
      const detailedPurchase = res.data;

      setPurchases((prev) => {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          purchaseItems: detailedPurchase.purchaseItems,
        };
        return updated;
      });

      setOpenIndexes((prev) => ({ ...prev, [idx]: true }));
    } catch (error) {
      console.error("خطأ في جلب تفاصيل الفاتورة:", error);
      showSnackbar("فشل في جلب تفاصيل الفاتورة", "error");
    }
  };

  // فتح نافذة التأكيد مع حفظ الفاتورة المراد حذفها
  const openDeleteDialog = (purchaseID, idx) => {
    setPurchaseToDelete({ purchaseID, idx });
    setDialogOpen(true);
  };

  // إغلاق نافذة التأكيد
  const closeDeleteDialog = () => {
    setDialogOpen(false);
    setPurchaseToDelete(null);
  };

  // فتح نافذة التعديل
  const openEditDialog = async (purchaseID, idx) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/Purchase/${purchaseID}`
      );
      const purchaseData = res.data;

      setEditFormData({
        purchaseID: purchaseData.purchaseID,
        supplierId: purchaseData.supplierId ?? purchaseData.supplierID,
        purchaseDate: purchaseData.purchaseDate
          ? purchaseData.purchaseDate.split("T")[0]
          : "",
        discount: purchaseData.discount ?? 0,
        totalAmount: purchaseData.totalAmount ?? 0,
        purchaseItems:
          purchaseData.purchaseItems?.map((item) => ({
            purchaseItemID: item.purchaseItemID,
            productID: item.productID,
            price: item.price || 0,
            quantity: item.quantity,
            batchResponses:
              item.batchResponses?.map((batch) => ({
                batchID: batch.batchID,
                remainQuantity: batch.remainQuantity,
                batchNumber: batch.batchNumber || "",
                barcode: batch.barcode || "",
                expirationDate: batch.expirationDate
                  ? batch.expirationDate.split("T")[0]
                  : "",
              })) || [],
          })) || [],
      });

      setPurchaseToEdit({ purchaseID, idx, fullData: purchaseData });
      setEditDialogOpen(true);
    } catch (error) {
      console.error("خطأ في جلب بيانات الفاتورة للتعديل:", error);
      showSnackbar("فشل في جلب بيانات الفاتورة", "error");
    }
  };

  // إغلاق نافذة التعديل
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setPurchaseToEdit(null);
    setEditFormData({});
  };

  // تحديث بيانات النموذج
  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // تحديث بيانات المنتج
  const handleItemChange = (itemIndex, field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      purchaseItems: prev.purchaseItems.map((item, idx) =>
        idx === itemIndex ? { ...item, [field]: value } : item
      ),
    }));
  };

  // تحديث بيانات الباتش
  const handleBatchChange = (itemIndex, batchIndex, field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      purchaseItems: prev.purchaseItems.map((item, idx) =>
        idx === itemIndex
          ? {
              ...item,
              batchResponses: item.batchResponses.map((batch, bIdx) =>
                bIdx === batchIndex ? { ...batch, [field]: value } : batch
              ),
            }
          : item
      ),
    }));
  };

  // حفظ التعديلات
  const handleSaveEdit = async () => {
    try {
      const updateData = {
        purchaseID: editFormData.purchaseID,
        supplierId: editFormData.supplierId,
        purchaseDate: editFormData.purchaseDate,
        discount: parseFloat(editFormData.discount) || 0,
        totalAmount: parseFloat(editFormData.totalAmount) || 0,
        purchaseItems: editFormData.purchaseItems.map((item) => ({
          purchaseItemID: item.purchaseItemID,
          productID: parseInt(item.productID),
          price: parseFloat(item.price) || 0,
          quantity: parseInt(item.quantity) || 1,
          batches: item.batchResponses.map((batch) => ({
            batchID: batch.batchID,
            remainQuantity: parseInt(batch.remainQuantity) || 1,
            batchNumber: batch.batchNumber,
            barcode: batch.barcode,
            expirationDate: batch.expirationDate,
          })),
        })),
      };

      await axios.put(
        `http://localhost:5000/api/Purchase/${editFormData.purchaseID}`,
        updateData
      );

      // تحديث البيانات محلياً
      setPurchases((prev) => {
        const updated = [...prev];
        updated[purchaseToEdit.idx] = {
          ...updated[purchaseToEdit.idx],
          supplierId: updateData.supplierId,
          supplierID: updateData.supplierId,
          supplierName:
            suppliersMap[updateData.supplierId] || `#${updateData.supplierId}`,
          purchaseDate: updateData.purchaseDate,
          discount: updateData.discount,
          totalAmount: updateData.totalAmount,
          purchaseItems: editFormData.purchaseItems,
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

  // اظهار السناك بار
  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // تأكيد الحذف
  const confirmDelete = async () => {
    if (!purchaseToDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/Purchase/${purchaseToDelete.purchaseID}`
      );

      // حذف الفاتورة محلياً
      setPurchases((prev) => prev.filter((_, i) => i !== purchaseToDelete.idx));

      // إغلاق تفاصيل الفاتورة إذا كانت مفتوحة
      setOpenIndexes((prev) => {
        const copy = { ...prev };
        delete copy[purchaseToDelete.idx];
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
        قائمة الفواتير
      </Typography>

      {purchases.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }}>
          لا توجد فواتير لعرضها
        </Typography>
      )}

      {purchases.map((purchase, idx) => (
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
              فاتورة #{purchase.purchaseID ?? idx + 1} - المورد:{" "}
              {purchase.supplierName}
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                color="error"
                startIcon={<Delete />}
                onClick={() => openDeleteDialog(purchase.purchaseID, idx)}
              >
                حذف الفاتورة
              </Button>

              <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<Edit />}
                onClick={() => openEditDialog(purchase.purchaseID, idx)}
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
            {purchase.purchaseDate
              ? new Date(purchase.purchaseDate).toLocaleDateString()
              : "-"}
          </Typography>
          <Typography>الخصم: {purchase.discount ?? 0}</Typography>
          <Typography>المجموع: {purchase.totalAmount ?? 0}</Typography>

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
                    <TableCell align="center">الكمية الكلية</TableCell>
                    <TableCell align="center">السعر</TableCell>
                    <TableCell align="center">الكمية المتبقية  ضمن الدفعة</TableCell>
                    <TableCell align="center">رقم الباتش</TableCell>
                    <TableCell align="center">الباركود</TableCell>
                    <TableCell align="center">تاريخ الانتهاء</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchase.purchaseItems?.map((item, i) => (
                    <React.Fragment key={i}>
                      <TableRow>
                        <TableCell align="center">{item.productID}</TableCell>
                        <TableCell align="center">
                          {productsMap[item.productID] || "-"}
                        </TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="center">{item.price}</TableCell>
                        <TableCell align="center">
                          {item.batchResponses?.length > 0
                            ? item.batchResponses[0].remainQuantity
                            : "-"}
                        </TableCell>
                        <TableCell align="center">
                          {item.batchResponses?.length > 0
                            ? item.batchResponses[0].batchNumber
                            : "-"}
                        </TableCell>
                        <TableCell align="center">
                          {item.batchResponses?.length > 0
                            ? item.batchResponses[0].barcode
                            : "-"}
                        </TableCell>
                        <TableCell align="center">
                          {item.batchResponses?.length > 0
                            ? item.batchResponses[0].expirationDate?.split(
                                "T"
                              )[0] || "-"
                            : "-"}
                        </TableCell>
                      </TableRow>

                      {item.batchResponses?.length > 1 &&
                        item.batchResponses.slice(1).map((batch, j) => (
                          <TableRow key={j}>
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell align="center">
                              {batch.remainQuantity}
                            </TableCell>
                            <TableCell align="center">
                              {batch.batchNumber}
                            </TableCell>
                            <TableCell align="center">
                              {batch.barcode}
                            </TableCell>
                            <TableCell align="center">
                              {batch.expirationDate
                                ? batch.expirationDate.split("T")[0]
                                : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                    </React.Fragment>
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
          هل أنت متأكد من حذف الفاتورة رقم {purchaseToDelete?.purchaseID}؟
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
        <DialogTitle>تعديل الفاتورة رقم {editFormData.purchaseID}</DialogTitle>
        <DialogContent sx={{ overflow: "auto" }}>
          {/* بيانات الفاتورة الأساسية */}
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            بيانات الفاتورة الأساسية
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>المورد</InputLabel>
                <Select
                  value={editFormData.supplierId || ""}
                  label="المورد"
                  onChange={(e) =>
                    handleEditFormChange("supplierId", e.target.value)
                  }
                >
                  {Object.entries(suppliersMap).map(([id, name]) => (
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
                label="تاريخ الشراء"
                type="date"
                value={editFormData.purchaseDate || ""}
                onChange={(e) =>
                  handleEditFormChange("purchaseDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="الخصم"
                type="number"
                value={editFormData.discount || 0}
                onChange={(e) =>
                  handleEditFormChange("discount", e.target.value)
                }
                inputProps={{ min: 0, step: 0.01 }}
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

          {/* تفاصيل المنتجات */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            تفاصيل المنتجات
          </Typography>

          {editFormData.purchaseItems?.map((item, itemIndex) => (
            <Accordion key={itemIndex} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  المنتج #{itemIndex + 1}:{" "}
                  {productsMap[item.productID] || "غير محدد"}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  السعر: {item.price}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {/* بيانات المنتج */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      المنتج: {productsMap[item.productID] || "غير محدد"}
                    </Typography>
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
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                  </Grid>

                  {/* الباتشات */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      الباتشات
                    </Typography>

                    {item.batchResponses?.map((batch, batchIndex) => (
                      <Paper
                        key={batchIndex}
                        sx={{ p: 2, mb: 2, bgcolor: "#f5f5f5" }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={2}>
                            <TextField
                              fullWidth
                              label="الكمية"
                              type="number"
                              value={batch.remainQuantity || ""}
                              onChange={(e) =>
                                handleBatchChange(
                                  itemIndex,
                                  batchIndex,
                                  "remainQuantity",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12} md={2}>
                            <TextField
                              fullWidth
                              label="رقم الباتش"
                              value={batch.batchNumber || ""}
                              onChange={(e) =>
                                handleBatchChange(
                                  itemIndex,
                                  batchIndex,
                                  "batchNumber",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <TextField
                              fullWidth
                              label="الباركود"
                              value={batch.barcode || ""}
                              onChange={(e) =>
                                handleBatchChange(
                                  itemIndex,
                                  batchIndex,
                                  "barcode",
                                  e.target.value
                                )
                              }
                              size="small"
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <TextField
                              fullWidth
                              label="تاريخ الانتهاء"
                              type="date"
                              value={batch.expirationDate || ""}
                              onChange={(e) =>
                                handleBatchChange(
                                  itemIndex,
                                  batchIndex,
                                  "expirationDate",
                                  e.target.value
                                )
                              }
                              InputLabelProps={{ shrink: true }}
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
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

export default PurchasesListView;