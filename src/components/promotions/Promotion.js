import React, { useEffect, useState } from "react";
import {
  MessageText,
  PromotionContainer,
} from "../../screens/homePage/styles/PromotionContainer";
import { Box, Slide } from "@mui/material";

export function Promotion() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [show, setShow] = useState(true);

  const messages = [
    "20% off on your first order!",
    "Summer sale starts now, visit any store.",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <PromotionContainer>
      <Slide direction="left" in={show}>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <MessageText>{messages[messageIndex]}</MessageText>
        </Box>
      </Slide>
    </PromotionContainer>
  );
}

export default Promotion;
