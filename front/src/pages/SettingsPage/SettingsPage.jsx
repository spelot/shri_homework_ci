import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import { useSelector } from "react-redux";
import {
  getLanguageDictionary,
  getCurrentLanguge,
} from "../../store/reducers/settingsReducer";
import i18n from "../../utils/i18n";

function SettingsPage(props) {
  const { className = "", modifiers = [] } = props;

  const dictionary = useSelector(getLanguageDictionary);
  const currentLanguage = useSelector(getCurrentLanguge);

  useEffect(() => {
    document.title = `${i18n(dictionary, currentLanguage, "SETTINGS")} | ${i18n(
      dictionary,
      currentLanguage,
      "SITE_NAME"
    )}`;
  }, [dictionary, currentLanguage]);

  return (
    <>
      <Header
        className="Container-Header"
        title={{
          text: i18n(dictionary, currentLanguage, "SITE_NAME"),
          modifiers: [["type", "headerTitle"]],
        }}
      />
      <Form className={className} modifiers={modifiers} />
    </>
  );
}

export default SettingsPage;
