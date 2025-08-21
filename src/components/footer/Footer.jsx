import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  useTheme,
  List,
  ListItemText,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Telegram } from "@mui/icons-material";
import React from "react";
import { FooterTitle } from "../../screens/homePage/styles/footer/Footer";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        mt: 5,
        backgroundColor: "gray",
        color: "white",
        p: { xs: 4, md: 10 },
        pt: 12,
        pb: 12,
        fontSize: { xs: "12px", md: "14px" },
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {/* قسم عنا */}
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">{t("About us")}</FooterTitle>
          <Typography variant="caption2">
            {t(
              "PharmaCore is your trusted online pharmacy providing quality medications and healthcare products."
            )}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <a
              href="https://www.facebook.com/share/1JpdhU6D4c/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlinedIcon
                sx={{ mr: 1, color: "blue", cursor: "pointer" }}
              />
            </a>
            <a
              href="https://t.me/pharmacy_app2025"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Telegram sx={{ mr: 1, color: "pink", cursor: "pointer" }} />
            </a>
          </Box>
        </Grid>

        {/* قسم معلومات الاتصال الجديد */}
        <Grid item md={6} lg={4} ml={"30px"}>
          <FooterTitle variant="body1">{t("Contact Information")}</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                {t("Address")}: 123 Main Street, City, Country
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                {t("Phone")}: +1 (123) 456-7890
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                {t("Email")}: info@yourpharmacy.com
              </Typography>
            </ListItemText>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
