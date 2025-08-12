import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Collapse, Box, Typography
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

function PurchasesListView() {
  const [purchases, setPurchases] = useState([]);
  const [openRows, setOpenRows] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // جلب الفواتير والموردين مع بعض
        const [purchasesRes, suppliersRes] = await Promise.all([
          axios.get("http://localhost:5200/api/Purchase"),
          axios.get("http://localhost:5200/api/Supplier")
        ]);

        // إنشاء قاموس للموردين { supplierID: supplierName }
        const suppliersMap = {};
        suppliersRes.data.forEach(s => {
          suppliersMap[s.supplierID] = s.name;
        });

        // إضافة اسم المورد لكل فاتورة
        const purchasesWithNames = purchasesRes.data.map(p => ({
          ...p,
          name: suppliersMap[p.supplierID] || `#${p.supplierID}`
        }));

        setPurchases(purchasesWithNames);
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
      }
    };

    fetchData();
  }, []);

  const toggleRow = (index) => {
    setOpenRows(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <TableContainer component={Paper} sx={{ direction: "rtl", mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
            <TableCell />
            <TableCell align="center">#</TableCell>
            <TableCell align="center">المورد</TableCell>
            <TableCell align="center">تاريخ الشراء</TableCell>
            <TableCell align="center">الخصم</TableCell>
            <TableCell align="center">المجموع</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchases.map((purchase, idx) => (
            <React.Fragment key={idx}>
              {/* الصف الرئيسي */}
              <TableRow>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => toggleRow(idx)}>
                    {openRows[idx] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>
                <TableCell align="center">{idx + 1}</TableCell>
                <TableCell align="center">{purchase.supplierName}</TableCell>
                <TableCell align="center">
                  {new Date(purchase.purchaseDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{purchase.discount ?? 0}</TableCell>
                <TableCell align="center">{purchase.totalAmount ?? 0}</TableCell>
              </TableRow>

              {/* الصف الفرعي */}
              <TableRow>
                <TableCell colSpan={6} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={openRows[idx]} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 2 }}>
                      <Typography variant="h6" gutterBottom>المنتجات</Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#e9f5ff" }}>
                            <TableCell align="center">معرّف المنتج</TableCell>
                            <TableCell align="center">الكمية</TableCell>
                            <TableCell align="center">السعر</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {purchase.purchaseItems?.map((item, i) => (
                            <React.Fragment key={i}>
                              <TableRow>
                                <TableCell align="center">{item.productID}</TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                              </TableRow>

                              {/* جدول الباتشات */}
                              {item.batches?.length > 0 && (
                                <TableRow>
                                  <TableCell colSpan={3}>
                                    <Typography variant="subtitle1" sx={{ mt: 1 }}>الباتشات</Typography>
                                    <Table size="small">
                                      <TableHead>
                                        <TableRow sx={{ backgroundColor: "#fff6e5" }}>
                                          <TableCell align="center">رقم الباتش</TableCell>
                                          <TableCell align="center">الباركود</TableCell>
                                          <TableCell align="center">الكمية</TableCell>
                                          <TableCell align="center">تاريخ الانتهاء</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {item.batches.map((batch, j) => (
                                          <TableRow key={j}>
                                            <TableCell align="center">{batch.batchNumber}</TableCell>
                                            <TableCell align="center">{batch.barcode}</TableCell>
                                            <TableCell align="center">{batch.quantity}</TableCell>
                                            <TableCell align="center">
                                              {new Date(batch.expirationDate).toLocaleDateString()}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableCell>
                                </TableRow>
                              )}
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PurchasesListView;
