import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import processModifiers from "../../utils/processModifiers";
import "./Footer.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getLanguageDictionary,
  getCurrentLanguge,
} from "../../store/reducers/settingsReducer";
import { fetchLanguageDictionary } from "../../store/actions/settingsActions";
import i18n from "../../utils/i18n";

function Footer(props) {
  const blockName = "Footer";
  const { className = "", modifiers = [] } = props;

  const dictionary = useSelector(getLanguageDictionary);
  const currentLanguage = useSelector(getCurrentLanguge);

  const dispatch = useDispatch();
  const onChangeCurrentLangClick = useCallback(
    () => {
      const newLanguage = currentLanguage === "en" ? "ru" : "en";
      window.localStorage.setItem("shri_ci_lang", newLanguage);
      console.log(
        "footer change lang clicked, changing language to ",
        newLanguage
      );
      dispatch(fetchLanguageDictionary(newLanguage, undefined, true));
    },
    // eslint-disable-next-line
    [currentLanguage]
  );

  return (
    <footer
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
    >
      <div className={`${blockName}-Content`}>
        <div className={`${blockName}-LinksWrapper`}>
          <Link
            to="/support"
            className={`${blockName}-Link MyLink MyLink_type_footer`}
          >
            {i18n(dictionary, currentLanguage, "SUPPORT")}
          </Link>
          <Link
            to="/learning"
            className={`${blockName}-Link MyLink MyLink_type_footer`}
          >
            {i18n(dictionary, currentLanguage, "LEARNING")}
          </Link>
          <div
            className={`${blockName}-Link MyLink MyLink_type_footer`}
            onClick={onChangeCurrentLangClick}
          >
            {i18n(dictionary, currentLanguage, "CHANGE_LOCALE")}
          </div>
        </div>
        <div className={`${blockName}-Credentional Text Text_type_footer`}>
          {i18n(dictionary, currentLanguage, "COPYRIGHT", { year: 2020 })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
