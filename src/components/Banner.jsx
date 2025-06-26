import { Typography } from "@mui/material";
import bannerImage from "../images/medications-1628372_640.jpg";
import {
  BannerContainer,
  BannerContent,
  BannerTitle,
  BannerDescription,
  BannerImage,
} from "../screens/homePage/styles/BannerContainer";
import { useTranslation } from "react-i18next";

function Banner() {
  const { t } = useTranslation();
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
          <Typography variant="h6">
            {t(" “The tools, the meds, the control — — all in one place.”")}
          </Typography>
          <BannerTitle variant="h2" fontFamily='"Montez", cursive'>
            {t("PharmaCore")}
          </BannerTitle>
          <BannerDescription variant="subtitle">
            {t(
              "A smart platform for effortless drug and inventory management, built specifically for pharmacy owners and managers — full control, greater efficiency."
            )}
          </BannerDescription>
        </BannerContent>
      </BannerContainer>
    </>
  );
}

export default Banner;
