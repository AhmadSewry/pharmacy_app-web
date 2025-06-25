import React, { useEffect } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import cookies from "js-cookie";

function Localiztion() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  useEffect(() => {
    window.document.direction = i18n.dir();
  }, [lng]);
  return (
    <>
      <h2>{t("Welcome to React")}</h2>;
      <button
        onClick={() => {
          i18n.changeLanguage("ar");
        }}
      >
        Ar
      </button>
      <button
        onClick={() => {
          i18n.changeLanguage("En");
        }}
      >
        En
      </button>
    </>
  );
}
export default Localiztion;
