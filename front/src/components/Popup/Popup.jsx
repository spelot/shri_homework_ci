import React, { useRef } from "react";
import processModifiers from "../../utils/processModifiers";
import "./Popup.scss";
import { useDispatch, useSelector } from "react-redux";
import { startNewBuild } from "../../store/actions/buildsActions";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { togglePopup } from "../../store/actions/commonActions";
import i18n from "../../utils/i18n";
import {
  getLanguageDictionary,
  getCurrentLanguge,
} from "../../store/reducers/settingsReducer";

function Popup(props) {
  const blockName = "Form";
  const { className = "", modifiers = [] } = props;

  const dictionary = useSelector(getLanguageDictionary);
  const currentLanguage = useSelector(getCurrentLanguge);

  const dispatch = useDispatch();

  const commitHashRef = useRef(null);

  const handleSubmit = async (event) => {
    event && event.preventDefault();

    const commitHash = commitHashRef.current.value.trim();
    console.log("commitHash: ", commitHash);

    dispatch(startNewBuild(commitHash));
  };

  const handleCancel = () => {
    commitHashRef.current.value = "";
    dispatch(togglePopup(false));
  };

  return (
    <div className={`Popup-Wrapper`}>
      <form
        className={`Popup ${className} ${blockName} ${processModifiers(
          blockName,
          modifiers
        )}`}
        onSubmit={handleSubmit}
      >
        <div className={`${blockName}-Content`}>
          <div className={`${blockName}-Header Text Text_type_popupHeader`}>
            {i18n(dictionary, currentLanguage, "NEW_BUILD")}
          </div>
          <div className={`${blockName}-Item`}>
            <Input
              className={`${blockName}-Input`}
              modifiers={[["clear", "visible"]]}
              labelBefore={{
                text: "NEW_BUILD_POPUP_DESCRIPTION",
                className: `${blockName}-Label`,
                modifiers: [["type", "formLabel"]],
              }}
              id="commit"
              type="text"
              placeholder={i18n(dictionary, currentLanguage, "COMMIT_HASH")}
              pattern="\S+"
              name="commit"
              required
              value=""
              forwardRef={commitHashRef}
            />
          </div>
          <div className={`${blockName}-Item`}>
            <div className={`${blockName}-ButtonsBlock`}>
              <Button
                className={`${blockName}-Button`}
                modifiers={[["color", "accent"]]}
                text={i18n(dictionary, currentLanguage, "RUN_BUILD")}
                type="submit"
              />
              <Button
                type="button"
                className={`${blockName}-Button`}
                modifiers={[["color", "transparent"]]}
                onClick={handleCancel}
                text={i18n(dictionary, currentLanguage, "CANCEL")}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Popup;
