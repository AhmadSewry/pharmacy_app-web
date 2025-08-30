// src/pages/Localization.js
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { host } from "../App";

function Localization() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // تغيير اتجاه الصفحة عند تغيير اللغة
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div style={{ 
      padding: '2rem',
      textAlign: i18n.language === 'ar' ? 'right' : 'left',
      fontFamily: i18n.language === 'ar' ? 'Tahoma, sans-serif' : 'Arial, sans-serif'
    }}>
      <h2>{t('Medications')}</h2>
      <LanguageSwitcher />
      <p>{t('Welcome to React')}</p>
      <p>{t('Our Products')}</p>
    </div>
  );
}

export default Localization;