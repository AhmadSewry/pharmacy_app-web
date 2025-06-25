import React from "react";
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={() => handleLanguageChange("en")}>
        English
      </Button>
      <Button variant="outlined" onClick={() => handleLanguageChange("ar")}>
        العربية
      </Button>
    </Stack>
  );
}

export default LanguageSwitcher;
