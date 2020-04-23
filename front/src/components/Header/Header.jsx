import React from "react";
import processModifiers from "../../utils/processModifiers";
import Button from "../Button/Button";
import history from "../../history";
import constants from "../../utils/constants";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { togglePopup } from "../../store/actions/commonActions";
import { rebuild } from "../../store/actions/buildsActions";
import { getDetails } from "../../store/reducers/buildsReducer";

function Header(props) {
  const blockName = "Header";
  const {
    className = "",
    modifiers = [],
    title = {
      text: false,
      modifiers: [],
    },
    buttons = [],
  } = props;

  const dispatch = useDispatch();
  const details = useSelector(getDetails);

  return (
    <header
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
    >
      <div className={`${blockName}-Content`}>
        {title.text && (
          <div
            className={`${blockName}-Title Text ${processModifiers(
              "Text",
              title.modifiers
            )}`}
          >
            {title.text}
          </div>
        )}
        {buttons.length > 0 && (
          <div className={`${blockName}-ButtonsBlock`}>
            {buttons.map((buttonProps, buttonKey) => {
              const { modifiers, onClick, text, iconType } = buttonProps;

              let onClickFn;
              switch (onClick) {
                case constants.GO_TO_SETTINGS:
                  onClickFn = () => history.push("/settings");
                  break;
                case constants.RUN_BUILD:
                  onClickFn = () => {
                    dispatch(togglePopup(true));
                  };
                  break;
                case constants.REBUILD:
                  onClickFn = () => {
                    dispatch(rebuild(details.commitHash));
                  };
                  break;
                default:
                  break;
              }

              return (
                <Button
                  key={buttonKey}
                  className={`${blockName}-Button`}
                  modifiers={modifiers}
                  onClick={onClickFn}
                  text={text}
                  iconType={iconType}
                />
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
