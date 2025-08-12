import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Card, Typography, Divider, Tabs, Tab, Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";

// تسجيل عناصر Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const FinancialPieChart = () => {
  const [tabValue, setTabValue] = useState(0);

  // دالة توليد البيانات حسب الفترة
  const generateData = (period) => {
    const categories = [
      "أدوية",
      "مستلزمات طبية",
      "العناية بالبشرة",
      "مستلزمات الأطفال",
    ];
    const data = {
      daily: [4500, 3200, 1800, 1200],
      weekly: [12500, 8400, 6800, 4500],
      monthly: [38400, 25600, 19800, 12700],
    };

    return {
      labels: categories,
      datasets: [
        {
          data: data[period],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          borderWidth: 1,
          hoverOffset: 20,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "التوزيع النسبي للمبيعات",
        font: { size: 18, family: "'Tajawal', sans-serif" },
        padding: { top: 10, bottom: 30 },
      },
      legend: {
        position: "right",
        rtl: true,
        labels: {
          font: { family: "'Tajawal', sans-serif" },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value.toLocaleString()} ل.س (${percentage}%)`;
          },
        },
        bodyFont: { family: "'Tajawal', sans-serif", size: 14 },
      },
    },
    cutout: "60%",
    animation: { animateScale: true, animateRotate: true },
  };

  // تحديد الفترة حسب التبويب
  const period =
    tabValue === 0 ? "daily" : tabValue === 1 ? "weekly" : "monthly";

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        direction: "rtl",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#2E7D32",
          textAlign: "center",
        }}
      >
        التقارير المالية للصيدلية
      </Typography>

      {/* تبويبات الفترات */}
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        centered
        sx={{ mb: 2 }}
      >
        <Tab label="تقرير يومي" />
        <Tab label="تقرير أسبوعي" />
        <Tab label="تقرير شهري" />
      </Tabs>

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="body1"
        sx={{ mb: 3, color: "#555", textAlign: "center" }}
      >
        تحليل توزيع المبيعات حسب الأقسام
      </Typography>

      <Box sx={{ height: "400px", position: "relative" }}>
        <Pie data={generateData(period)} options={options} />
      </Box>

      <Typography
        variant="caption"
        display="block"
        sx={{
          mt: 2,
          color: "#777",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        آخر تحديث: {new Date().toLocaleDateString("ar-SY")}
      </Typography>
    </Card>
  );
};

export default FinancialPieChart;
