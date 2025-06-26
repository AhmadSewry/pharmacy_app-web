import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Banner from "../../components/Banner";
import { AppBarHeader } from "./styles/BannerContainer";
import Promotion from "../../components/Promotion";
import Products from "../../components/product/Products";
import Footer from "../../components/footer/Footer";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";

function HomePage() {
  const { t } = useTranslation();
  return (
    <Container>
      <LanguageSwitcher />
<></>
      <AppBarHeader>{t("Medications")}</AppBarHeader>
      <Banner></Banner>
      <Promotion></Promotion>
      <Box display={"flex"} justifyContent={"center"} sx={{ p: 4 }}>
        <Typography variant="h4" fontFamily='"Montez", cursive'>
          {t("Our Products")}
        </Typography>
      </Box>
      <Products></Products>
      <Footer></Footer>
    </Container>
  );
}

export default HomePage;
