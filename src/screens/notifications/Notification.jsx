import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
// New icons for pharmacy-specific notifications
import OutOfStockIcon from "@mui/icons-material/Inventory2";
import ExpiredIcon from "@mui/icons-material/AvTimer";
import PrescriptionIcon from "@mui/icons-material/Description";

// Updated mock data with pharmacy-specific notification types
const mockNotifications = [
  {
    id: 1,
    title: "Low Stock Alert: Ibuprofen 200mg",
    message: "Only 5 units remaining. Please restock soon.",
    timestamp: "10 minutes ago",
    type: "out_of_stock",
  },
  {
    id: 2,
    title: "Expiration Alert: Amoxicillin",
    message: "Expires in 15 days. Please move to clearance or discard.",
    timestamp: "1 hour ago",
    type: "expired",
  },
  {
    id: 3,
    title: "New Prescription Request",
    message: "A new prescription for John Doe is ready to be processed.",
    timestamp: "3 hours ago",
    type: "prescription",
  },
];

// Helper function to get icons based on the new notification types
const getIcon = (type) => {
  switch (type) {
    case "out_of_stock":
      return <OutOfStockIcon color="warning" />;
    case "expired":
      return <ExpiredIcon color="error" />;
    case "prescription":
      return <PrescriptionIcon color="info" />;
    default:
      return null; // For general notifications
  }
};

function Notification() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleDeleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Pharmacy Notifications
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={2} sx={{ maxWidth: 600, mx: "auto" }}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card key={notification.id} elevation={3}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  {/* Icon */}
                  <Avatar sx={{ bgcolor: "background.paper" }}>
                    {getIcon(notification.type)}
                  </Avatar>
                  {/* Text Content */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      sx={{ mt: 1 }}
                    >
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {notification.timestamp}
                      </Typography>
                    </Stack>
                  </Box>
                  {/* Delete Button */}
                  <IconButton
                    aria-label="delete notification"
                    onClick={() => handleDeleteNotification(notification.id)}
                    sx={{ mt: -1, mr: -1 }}
                  >
                    <DeleteIcon fontSize="small" color="action" />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, textAlign: "center" }}
          >
            You don't have any notifications.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default Notification;
