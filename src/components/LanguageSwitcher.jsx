// src/components/LanguageSwitcher.js
import React from "react";
import { Button, Stack, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  return (
    <Stack direction="row" spacing={2}>
      {languages.map((lang) => (
        <Button
          sx={{
            backgroundColor:
              theme.palette.mode === "light" ? "#107163" : "gold",
            color: "white",
          }}
          key={lang.code}
          variant={i18n.language === lang.code ? "contained" : "outlined"}
          onClick={() => i18n.changeLanguage(lang.code)}
        >
          {lang.label}
        </Button>
      ))}
    </Stack>
  );
}

export default LanguageSwitcher;
