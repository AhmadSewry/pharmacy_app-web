import { Typography } from "@mui/material";
import bannerImage from "../images/medications-1628372_640.jpg";
import {
  BannerContainer,
  BannerContent,
  BannerTitle,
  BannerDescription,
  BannerImage,
} from "../screens/homePage/styles/BannerContainer";

function Banner() {
  return (
    <>
      <BannerContainer
        display={"flex"}
        position={"relative"}
        overflow={"hidden"}
        borderRadius="16px"
      >
        <BannerImage src={bannerImage}></BannerImage>
        <BannerContent>
          <Typography variant="h6">Pharmacy Simplified</Typography>
          <BannerTitle variant="h2" fontFamily='"Montez", cursive'>
            Medicenes
          </BannerTitle>
          <BannerDescription variant="subtitle">
            Get prescriptions refilled, schedule medication reminders, and
            access pharmacist consultations - all in one place. Fast, discreet
            delivery to your doorstep.
          </BannerDescription>
        </BannerContent>
      </BannerContainer>
    </>
  );
}

export default Banner;
