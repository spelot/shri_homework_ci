import React from "react";
import processModifiers from "../../utils/processModifiers";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NotFound.scss";
import i18n from "../../utils/i18n";
import {
  getLanguageDictionary,
  getCurrentLanguge,
} from "../../store/reducers/settingsReducer";

function NotFound(props) {
  const blockName = "NotFound";
  const { className = "", modifiers = [] } = props;

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
        {i18n(dictionary, currentLanguage, "ERROR_404")}{" "}
        <Link to="/">
          {i18n(dictionary, currentLanguage, "GO_TO_HOME_PAGE")}
        </Link>
        .
      </div>
    </main>
  );
}

export default NotFound;
