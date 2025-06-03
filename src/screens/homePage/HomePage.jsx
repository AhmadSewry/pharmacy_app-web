import { AppBar, Container } from "@mui/material";
import React from "react";
import Banner from "../../components/Banner";
import { AppBarHeader } from "./styles/BannerContainer";

function HomePage() {
  return (
    <Container>
      <AppBarHeader>Medications</AppBarHeader>
      <Banner></Banner>
    </Container>
  );
}

export default HomePage;
