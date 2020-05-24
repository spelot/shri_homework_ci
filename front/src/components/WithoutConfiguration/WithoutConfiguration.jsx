import React from "react";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import processModifiers from "../../utils/processModifiers";
import "./WithoutConfiguration.scss";
import {
  getLanguageDictionary,
  getCurrentLanguge,
} from "../../store/reducers/settingsReducer";
import { useSelector } from "react-redux";
import i18n from "../../utils/i18n";

function WithoutConfiguration(props) {
  const blockName = "WithoutConfiguration";
  const { className = "", modifiers = [], actionFn } = props;

  const dictionary = useSelector(getLanguageDictionary);
  const currentLanguage = useSelector(getCurrentLanguge);

  return (
    <main
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
    >
      <div className={`${blockName}-Content`}>
        <Icon
          className={`${blockName}-Logo`}
          modifiers={[["type", "settingsLogo"]]}
        />
        <div className={`${blockName}-Description Text`}>
          {i18n(dictionary, currentLanguage, "WITHOUT_CONFIG_DESC")}
        </div>
        <Button
          className={`${blockName}-Button`}
          modifiers={[["color", "accent"]]}
          onClick={actionFn}
          text={i18n(dictionary, currentLanguage, "OPEN_SETTINGS")}
        />
      </div>
    </main>
  );
}

export default WithoutConfiguration;
