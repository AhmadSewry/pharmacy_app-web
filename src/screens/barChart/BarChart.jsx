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
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, Delete } from "@mui/icons-material";

function PurchasesListView() {
  const [purchases, setPurchases] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [openIndexes, setOpenIndexes] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [purchaseToDelete, setPurchaseToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [purchasesRes, suppliersRes, productsRes] = await Promise.all([
        axios.get("http://localhost:5200/api/Purchase"),
        axios.get("http://localhost:5200/api/Supplier"),
        axios.get("http://localhost:5200/api/Product"),
      ]);

      const suppliersMap = {};
      suppliersRes.data.forEach((s) => {
        suppliersMap[s.supplierId ?? s.supplierID] = s.name;
      });

      const productsDictionary = {};
      productsRes.data.forEach((p) => {
        productsDictionary[p.productId ?? p.productID] = p.name;
      });
      setProductsMap(productsDictionary);

      const purchasesWithNames = purchasesRes.data.map((p) => ({
        ...p,
        supplierName: suppliersMap[p.supplierId ?? p.supplierID] || `#${p.supplierId ?? p.supplierID}`,
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
      const res = await axios.get(`http://localhost:5200/api/Purchase/${purchase.purchaseID}`);
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
      await axios.delete(`http://localhost:5200/api/Purchase/${purchaseToDelete.purchaseID}`);

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
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: "#f9f9f9",
            direction: "rtl",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">
              فاتورة #{purchase.purchaseID ?? idx + 1} - المورد: {purchase.supplierName}
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
                onClick={() => toggleDetails(idx)}
                endIcon={openIndexes[idx] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              >
                {openIndexes[idx] ? "إخفاء التفاصيل" : "عرض التفاصيل"}
              </Button>
            </Box>
          </Box>

          <Typography sx={{ mt: 1 }}>
            التاريخ: {purchase.purchaseDate ? new Date(purchase.purchaseDate).toLocaleDateString() : "-"}
          </Typography>
          <Typography>الخصم: {purchase.discount ?? 0}</Typography>
          <Typography>المجموع: {purchase.totalAmount ?? 0}</Typography>

          <Collapse in={openIndexes[idx]} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                المنتجات:
              </Typography>
              <Table size="small" sx={{ bgcolor: "white", borderRadius: 1 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#e0f7fa" }}>
                    <TableCell align="center">معرّف المنتج</TableCell>
                    <TableCell align="center">اسم المنتج</TableCell>
                    <TableCell align="center">رقم الباتش</TableCell>
                    <TableCell align="center">الباركود</TableCell>
                    <TableCell align="center">السعر</TableCell>
                    <TableCell align="center">تاريخ الانتهاء</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchase.purchaseItems?.map((item, i) => (
                    <React.Fragment key={i}>
                      <TableRow>
                        <TableCell align="center">{item.productID}</TableCell>
                        <TableCell align="center">{productsMap[item.productID] || "-"}</TableCell>
                        <TableCell align="center">
                          {item.batchResponses?.length > 0 ? item.batchResponses[0].batchNumber : "-"}
                        </TableCell>
                        <TableCell align="center">
                          {item.batchResponses?.length > 0 ? item.batchResponses[0].barcode : "-"}
                        </TableCell>
                        <TableCell align="center">{item.price}</TableCell>
                        <TableCell align="center">
                          {item.batchResponses?.length > 0
                            ? item.batchResponses[0].expirationDate?.split("T")[0] || "-"
                            : "-"}
                        </TableCell>
                      </TableRow>

                      {item.batchResponses?.length > 1 &&
                        item.batchResponses.slice(1).map((batch, j) => (
                          <TableRow key={j}>
                            <TableCell />
                            <TableCell />
                            <TableCell align="center">{batch.batchNumber}</TableCell>
                            <TableCell align="center">{batch.barcode}</TableCell>
                            <TableCell />
                            <TableCell align="center">
                              {batch.expirationDate ? batch.expirationDate.split("T")[0] : "-"}
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
