/* import LanguageDetector from 'i18next-browser-languagedetector'; //用于检测浏览器的语言配置 */
import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import Fetch from 'i18next-fetch-backend';

i18n.use(initReactI18next).use(Fetch).init({
        fallbackLng: 'zh',
        preload: ['en', 'zh'],
        react: { 
          useSuspense: false
        },
        backend: {
          loadPath: '/{{lng}}.json',
        },
      });
export default i18n

