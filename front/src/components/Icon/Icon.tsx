import React from "react";
import processModifiers from "../../utils/processModifiers";
import "./Icon.scss";
import { DefaultProps } from "../../types/defaultProps";

export interface IconProps extends DefaultProps {
  onClick?: React.DOMAttributes<HTMLDivElement>["onClick"];
}

function Icon(props: IconProps) {
  const blockName = "Icon";
  const { className = "", modifiers = [], onClick } = props;

  return (
    <div
      className={`${className} ${blockName} ${processModifiers(
        blockName,
        modifiers
      )}`}
      onClick={onClick}
    />
  );
}

export default Icon;
