import React from "react";
import processModifiers from "../../utils/processModifiers";
import "./Icon.scss";

function Icon(props) {
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
