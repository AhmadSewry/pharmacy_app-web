import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  Stack,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Sales() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [saleItems, setSaleItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [employeeName, setEmployeeName] = useState(""); 
  const [saleDate] = useState(new Date().toISOString());
  
  // جلب معرف الموظف من localStorage أو من token
  const getEmployeeId = () => {
    // محاولة جلب الـ ID من أماكن مختلفة في localStorage
    const possibleKeys = ["employeeID", "employeeId", "userId", "user_id", "id"];
    
    for (const key of possibleKeys) {
      const value = localStorage.getItem(key);
      if (value && value !== "null" && value !== "undefined") {
        return value;
      }
    }
    
    // إذا ما لقينا ID، نجرب نستخرجه من الـ token
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // فك تشفير الـ JWT token للحصول على الـ user ID
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.nameid || payload.id || payload.userId || payload.employeeId;
      }
    } catch (err) {
      console.error("Error parsing token:", err);
    }
    
    return null;
  };

  const employeeId = getEmployeeId();

  // جلب اسم الموظف الحالي
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!employeeId) {
          console.error("No employee ID found");
          console.log("Checking localStorage keys:", {
            employeeID: localStorage.getItem("employeeID"),
            employeeId: localStorage.getItem("employeeId"), 
            userId: localStorage.getItem("userId"),
            user_id: localStorage.getItem("user_id"),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token") ? "exists" : "missing"
          });
          setEmployeeName("غير محدد"); 
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          setEmployeeName("غير مصرح");
          return;
        }

        console.log(`Fetching employee data for ID: ${employeeId}`);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const res = await axios.get(`http://localhost:5200/api/Employee/by-id/${employeeId}`, config);
        const emp = res.data;

        console.log("Employee data received:", emp);
  
        if (emp.role === "Admin") {
          setEmployeeName("Super Admin");
        } else {
          setEmployeeName(emp.personName || emp.name || emp.fullName || "موظف");
        }
      } catch (err) {
        console.error("Error fetching employee:", err);
        if (err.response?.status === 404) {
          setEmployeeName(`موظف غير موجود (ID: ${employeeId})`);
        } else {
          setEmployeeName("خطأ في جلب البيانات"); 
        }
      }
    };
  
    fetchEmployee();
  }, [employeeId]);

  // جلب المنتجات
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get("http://localhost:5200/api/Product", config);
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // حساب التوتال تلقائياً كلما تغيرت saleItems
  useEffect(() => {
    const calculatedTotal = saleItems.reduce((sum, item) => sum + item.subtotal, 0);
    setTotalAmount(calculatedTotal);
  }, [saleItems]);

  // إضافة منتج
  const handleAddProduct = () => {
    if (!selectedProductId || !quantity) {
      alert("يرجى اختيار المنتج وإدخال الكمية");
      return;
    }

    const selectedProduct = products.find(
      (p) => p.productId === selectedProductId
    );

    if (!selectedProduct) return;

    // التحقق من وجود المنتج مسبقاً في القائمة
    const existingItemIndex = saleItems.findIndex(item => item.productId === selectedProduct.productId);
    
    if (existingItemIndex !== -1) {
      // إذا كان المنتج موجود، تحديث الكمية
      const updatedItems = [...saleItems];
      updatedItems[existingItemIndex].quantity += parseInt(quantity, 10);
      updatedItems[existingItemIndex].subtotal = updatedItems[existingItemIndex].sellPrice * updatedItems[existingItemIndex].quantity;
      setSaleItems(updatedItems);
    } else {
      // إضافة منتج جديد
      const newItem = {
        productId: selectedProduct.productId,
        name: selectedProduct.name,
        sellPrice: selectedProduct.sellPrice,
        quantity: parseInt(quantity, 10),
        subtotal: selectedProduct.sellPrice * parseInt(quantity, 10),
      };
      setSaleItems([...saleItems, newItem]);
    }

    setQuantity("");
    setSelectedProductId("");
  };

  // حذف منتج من القائمة
  const handleRemoveProduct = (index) => {
    const updatedItems = saleItems.filter((_, i) => i !== index);
    setSaleItems(updatedItems);
  };

  // تعديل كمية المنتج
  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity <= 0) return;
    
    const updatedItems = [...saleItems];
    updatedItems[index].quantity = newQuantity;
    updatedItems[index].subtotal = updatedItems[index].sellPrice * newQuantity;
    setSaleItems(updatedItems);
  };

  // إرسال البيع
  const handleSubmitSale = async () => {
    if (saleItems.length === 0) {
      alert("يرجى إضافة منتجات للبيع");
      return;
    }

    // التحقق من وجود employeeId
    if (!employeeId) {
      alert("معرف الموظف غير موجود، يرجى تسجيل الدخول مرة أخرى");
      return;
    }

    try {
      const payload = {
        employeeId: parseInt(employeeId, 10),
        saleDate,
        totalAmount, // إضافة التوتال المحسوب
        saleItems: saleItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.sellPrice,
        })),
      };

      console.log("Sending payload:", payload); // للتأكد من البيانات المرسلة

      // إضافة التوكن في الهيدر
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("http://localhost:5200/api/Sale", payload, config);
      
      // إعادة تعيين الحقول بعد البيع الناجح
      setSaleItems([]);
      setTotalAmount(0);
      setQuantity("");
      setSelectedProductId("");
      
      alert("تمت عملية البيع بنجاح ✅");
    } catch (err) {
      console.error("Error submitting sale:", err);
      if (err.response?.status === 401) {
        alert("انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى");
        // يمكنك إعادة توجيه المستخدم لصفحة تسجيل الدخول
        // window.location.href = "/login";
      } else if (err.response?.status === 400) {
        alert("خطأ في البيانات المرسلة، يرجى التحقق من المعلومات");
      } else {
        alert("فشل تسجيل عملية البيع ❌");
      }
    }
  };

  // مسح جميع العناصر
  const handleClearAll = () => {
    if (saleItems.length === 0) return;
    
    if (window.confirm("هل أنت متأكد من مسح جميع العناصر؟")) {
      setSaleItems([]);
      setTotalAmount(0);
      setQuantity("");
      setSelectedProductId("");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
        {t("Sale Receipt")}
      </Typography>

      {/* اختيار المنتج */}
      <Card sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          {t("Add Product")}
        </Typography>
        
        <FormControl variant="filled" fullWidth>
          <InputLabel>{t("Select Product")}</InputLabel>
          <Select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            {products.map((prod) => (
              <MenuItem key={prod.productId} value={prod.productId}>
                {prod.name} - ${prod.sellPrice}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label={t("Quantity")}
          type="number"
          variant="filled"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          inputProps={{ min: "1", step: "1" }}
        />

        <Button 
          variant="contained" 
          onClick={handleAddProduct}
          size="large"
          disabled={!selectedProductId || !quantity}
        >
          {t("Add Product")}
        </Button>
      </Card>

      {/* عرض الفاتورة */}
      {saleItems.length > 0 && (
        <Card sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {t("Sale Items")} ({saleItems.length})
            </Typography>
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              onClick={handleClearAll}
            >
              {t("Clear All")}
            </Button>
          </Box>
          
          {saleItems.map((item, index) => (
            <Box key={index}>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label={t("Product")}
                  value={item.name}
                  fullWidth
                  variant="filled"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label={t("Price")}
                  value={`$${item.sellPrice.toFixed(2)}`}
                  variant="filled"
                  sx={{ minWidth: 120 }}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label={t("Qty")}
                  type="number"
                  value={item.quantity}
                  variant="filled"
                  sx={{ minWidth: 100 }}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10) || 1)}
                  inputProps={{ min: "1", step: "1" }}
                />
                <TextField
                  label={t("Subtotal")}
                  value={`$${item.subtotal.toFixed(2)}`}
                  variant="filled"
                  sx={{ minWidth: 140 }}
                  InputProps={{ readOnly: true }}
                />
                <Button 
                  variant="outlined" 
                  color="error" 
                  size="small"
                  onClick={() => handleRemoveProduct(index)}
                  sx={{ minWidth: 80 }}
                >
                  {t("Remove")}
                </Button>
              </Stack>
              {index < saleItems.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
          
          {/* ملخص الفاتورة */}
          <Box sx={{ backgroundColor: "grey.50", p: 2, borderRadius: 1 }}>
            <Stack spacing={1}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">{t("Items Count")}:</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {saleItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
                  {t("Total Amount")}:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button 
              variant="outlined"
              size="large"
              sx={{ flex: 1 }} 
              onClick={handleClearAll}
            >
              {t("Cancel")}
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ flex: 2 }} 
              onClick={handleSubmitSale}
            >
              {t("Confirm Sale")}
            </Button>
          </Stack>
        </Card>
      )}

      {/* بيانات إضافية */}
      <Box sx={{ textAlign: "center", mt: 2, p: 2, backgroundColor: "grey.50", borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: "primary.main" }}>
          {t("Sale Information")}
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            {t("Employee")}: <strong>{employeeName}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("Employee ID")}: {employeeId || "غير محدد"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("Date")}: {new Date(saleDate).toLocaleDateString("ar-SA")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("Time")}: {new Date(saleDate).toLocaleTimeString("ar-SA")}
          </Typography>
        </Stack>
      </Box>

      {/* رسالة إرشادية */}
      {saleItems.length === 0 && (
        <Card sx={{ p: 3, textAlign: "center", backgroundColor: "info.light", color: "info.contrastText" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            💡 {t("Start by selecting a product and adding it to your sale")}
          </Typography>
          <Typography variant="body2">
            {t("You can add multiple products and adjust quantities as needed")}
          </Typography>
        </Card>
      )}
    </Box>
  );
}

export default Sales;