import React from "react";
import { useSelector } from "react-redux";
import Icon from "../Icon/Icon";
import processModifiers from "../../utils/processModifiers";
import "./Button.scss";
import { DefaultProps } from "../../types/defaultProps";
import { getIsInProgress } from "../../store/reducers/commonReducer";

export interface ButtonProps extends DefaultProps {
  text?: string | null;
  onClick?: { (): void };
  iconType?: string | null;
  type?: "button" | "submit" | "reset";
}

function Button(props: ButtonProps) {
  const blockName = "Button";
  const {
    className = "",
    modifiers = [],
    onClick = () => {},
    text = null,
    iconType = null,
    type = "button",
  } = props;

  const isInProgress = useSelector(getIsInProgress);

  return (
    <button
      type={type}
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )} ${isInProgress ? `${blockName}_disabled` : ""}`}
      onClick={onClick}
    >
      {iconType && (
        <Icon
          className={`${blockName}-Icon`}
          modifiers={[["type", iconType]]}
        />
      )}
      {text && <div className={`${blockName}-Text`}>{text}</div>}
    </button>
  );
}

export default Button;
