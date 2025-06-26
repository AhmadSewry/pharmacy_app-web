import React, { useEffect, useRef, useState } from "react";
import {
  MessageText,
  PromotionContainer,
} from "../screens/homePage/styles/PromotionContainer";
import { Box, Slide } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Promotion() {
  const { t } = useTranslation();
  const [messageIndex, setMessageIndex] = useState(0);
  const [show, setShow] = useState(true);
  const containerRef = useRef();
  const messages = [
    t("Welcome to our Pharmacy App."),
    t("Where pharmacy meets simplicity."),
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [messages.length]);

  return (
    <PromotionContainer
      ref={containerRef}
      display={"flex"}
      position={"relative"}
      overflow={"hidden"}
      borderRadius="16px"
      mt={"5px"}
    >
      <Slide
        container={containerRef.current}
        direction={show ? "left" : "right"}
        in={show}
        timeout={{ enter: 500, exit: 100 }}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <MessageText>{messages[messageIndex]}</MessageText>
        </Box>
      </Slide>
    </PromotionContainer>
  );
}

export default Promotion;
