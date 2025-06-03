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
      <BannerContainer>
        <BannerImage src={bannerImage}></BannerImage>
        <BannerContent>
          <Typography variant="h6">Huge Collection</Typography>
          <BannerTitle variant="h2">New Bags</BannerTitle>
          <BannerDescription variant="subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In ab ut
            voluptas, tenetur sit quos amet repudiandae, adipisci delectus
            repellendus cum sed blanditiis eius praesentium maiores totam
            sapiente exercitationem quibusdam.
          </BannerDescription>
        </BannerContent>
      </BannerContainer>
    </>
  );
}

export default Banner;
