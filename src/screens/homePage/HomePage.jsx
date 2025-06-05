import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Banner from "../../components/Banner";
import { AppBarHeader } from "./styles/BannerContainer";
import Promotion from "../../components/Promotion";
import Products from "../../components/product/Products";
import Footer from "../../components/footer/Footer";

function HomePage() {
  return (
    <Container>
      <AppBarHeader>Medications</AppBarHeader>
      <Banner></Banner>
      <Promotion></Promotion>
      <Box display={"flex"} justifyContent={"center"} sx={{ p: 4 }}>
        <Typography variant="h4">Our Products</Typography>
      </Box>
      <Products></Products>
      <Footer></Footer>
    </Container>
  );
}

export default HomePage;
