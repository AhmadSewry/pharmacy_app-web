import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rows, columns } from "./data";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function ManageTeam() {
  const { t } = useTranslation();
  const theme = useTheme();
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstName",
      headerName: t("First name"),
      editable: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: t("Last name"),
      editable: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "email",
      headerName: t("email"),
      type: "number",
      headerAlign: "center",
      editable: true,
      align: "center",
      flex: 1,
    },
    {
      field: "phone",
      headerName: t("phone"),
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "access",
      headerName: t("access"),
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      width: 160,
      headerAlign: "center",
      display: "flex",
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            sx={{
              backgroundColor:
                access === "Admin" ? theme.palette.secondary.dark : "#107163",
              p: "5px",
              width: "99px",
              textAlign: "center",
              borderRadius: "3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              justifySelf: "center",
              alignSelf: "center",
            }}
          >
            {access === "Admin" && (
              <AdminPanelSettingsOutlined
                sx={{ color: "white" }}
                fontSize="small"
              />
            )}
            {access === "User" && (
              <LockOpenOutlined sx={{ color: "white" }} fontSize="small" />
            )}
            <Typography
              sx={{ fontSize: "13px", color: "white" }}
              variant="body1"
            >
              {access}
            </Typography>
          </Box>
        );
      },
      headeralign: "center",
      align: "center",
    },
  ];
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Box style={{ mx: "auto", my: "auto" }}>
        <DataGrid rows={rows} columns={columns}></DataGrid>
      </Box>
    </div>
  );
}

export default ManageTeam;
