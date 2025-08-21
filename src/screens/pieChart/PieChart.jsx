import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Pie, Bar } from "react-chartjs-2";
import {
  Card,
  Typography,
  Divider,
  Tabs,
  Tab,
  Box,
  Grid,
  Container,
} from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "chart.js/auto";

// Register necessary Chart.js elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

// Pie Chart Component
const FinancialPieChart = () => {
  const [tabValue, setTabValue] = useState(0);
  const { t, i18n } = useTranslation(); // Use the hook here

  const generateData = (period) => {
    const categories = [
      t("Medicines"), // Translated
      t("Medical Supplies"), // Translated
      t("Skincare"), // Translated
      t("Baby Products"), // Translated
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
          backgroundColor: ["#000000ff", "#f50000ff", "#FFCE56", "#ddd"],
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
        text: t("Relative Sales Distribution"), // Translated
        font: { size: 18, family: "'Tajawal', sans-serif" },
        padding: { top: 10, bottom: 30 },
      },
      legend: {
        position: i18n.language === "ar" ? "right" : "left", // Dynamic positioning
        rtl: i18n.language === "ar", // Dynamic RTL
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
            return `${label}: ${value.toLocaleString()} SYP (${percentage}%)`;
          },
        },
        bodyFont: { family: "'Tajawal', sans-serif", size: 14 },
      },
    },
    cutout: "60%",
    animation: { animateScale: true, animateRotate: true },
  };

  const period =
    tabValue === 0 ? "daily" : tabValue === 1 ? "weekly" : "monthly";

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        direction: i18n.language === "ar" ? "rtl" : "ltr", // Dynamic direction
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
        {t("Pharmacy Financial Reports")} {/* Translated */}
      </Typography>

      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        centered
        sx={{ mb: 2 }}
      >
        <Tab label={t("Daily Report")} /> {/* Translated */}
        <Tab label={t("Weekly Report")} /> {/* Translated */}
        <Tab label={t("Monthly Report")} /> {/* Translated */}
      </Tabs>

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="body1"
        sx={{ mb: 3, color: "#555", textAlign: "center" }}
      >
        {t("Analysis of sales distribution by category")} {/* Translated */}
      </Typography>

      <Box sx={{ flexGrow: 1, position: "relative" }}>
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
        {t("Last Updated")}:{" "}
        {new Date().toLocaleDateString(
          i18n.language === "ar" ? "ar-SY" : "en-US"
        )}
      </Typography>
    </Card>
  );
};

// Sales Summary Component (Updated to use translations)
const SalesSummary = () => {
  const { t, i18n } = useTranslation();
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        height: "100%",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#2E7D32" }}
      >
        {t("Sales Summary")}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">{t("Daily Sales")}:</Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            10,700 SYP
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{t("Weekly Sales")}:</Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            32,200 SYP
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{t("Monthly Sales")}:</Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            96,500 SYP
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">{t("Daily Invoice Count")}:</Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            45
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

// Top Selling Items Component (Updated to use translations)
const TopSellingItems = () => {
  const { t, i18n } = useTranslation();
  const data = {
    labels: [
      t("Product A"),
      t("Medicine B"),
      t("Sunscreen C"),
      t("Vitamin D"),
      t("Baby Shampoo"),
    ],
    datasets: [
      {
        label: t("Quantity Sold"),
        data: [150, 120, 90, 85, 70],
        backgroundColor: "rgba(46, 125, 50, 0.6)",
        borderColor: "rgba(46, 125, 50, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t("Top Selling Products (Monthly)"),
        font: { size: 18, family: "'Tajawal', sans-serif" },
        padding: { top: 10, bottom: 20 },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: function (value) {
            return value;
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        height: "100%",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
    >
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        <Bar data={data} options={options} />
      </Box>
    </Card>
  );
};

// Main Dashboard Component (Updated to use translations)
const FinancialDashboard = () => {
  const { t, i18n } = useTranslation();
  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        direction: i18n.language === "ar" ? "rtl" : "ltr",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 8,
          color: "#1B5E20",
        }}
      >
        {t("Financial Dashboard")}
      </Typography>
      <Grid container spacing={4} sx={{ flexGrow: 1, alignItems: "stretch" }}>
        <Grid item xs={12} md={6}>
          <FinancialPieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            container
            spacing={4}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Grid item xs={12} sx={{ flexGrow: 1 }}>
              <SalesSummary />
            </Grid>
            <Grid item xs={12} sx={{ flexGrow: 1 }}>
              <TopSellingItems />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FinancialDashboard;
