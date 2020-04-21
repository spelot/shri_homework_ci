import React, { useState } from "react";
import Icon from "../Icon/Icon";
import processModifiers from "../../utils/processModifiers";
import "./Input.scss";
import { useSelector } from "react-redux";

function Input(props) {
  const blockName = "Input";
  const {
    className = "",
    modifiers = [],
    labelBefore = {
      text: false,
      className: "",
      modifiers: [],
    },
    labelAfter = {
      text: false,
      className: "",
      modifiers: [],
    },
    id,
    type = "text",
    placeholder = null,
    name,
    required = false,
    inputMode,
    value = "",
    pattern,
    forwardRef,
  } = props;

  const isClearButtonVisible =
    modifiers.filter(
      ([modifierName, modifierValue]) =>
        modifierName === "clear" && modifierValue === "visible"
    ).length > 0;

  const [valueFromState, setValueFromState] = useState(value);

  const handleChange = (event) => setValueFromState(event.target.value);
  const handleClear = () => setValueFromState("");

  const isInProgress = useSelector((state) => state.common.isInProgress);

  return (
    <>
      {labelBefore.text && (
        <label
          htmlFor={id}
          className={`${labelBefore.className} Text ${processModifiers(
            "Text",
            labelBefore.modifiers
          )}`}
        >
          {labelBefore.text}
        </label>
      )}
      <div
        className={`${className} ${blockName} ${processModifiers(
          blockName,
          modifiers
        )} ${isInProgress ? `${blockName}_disabled` : ""}`}
      >
        <input
          id={id}
          className={`${blockName}-Control`}
          type={type}
          placeholder={placeholder}
          name={name}
          required={required}
          onChange={handleChange}
          value={valueFromState}
          inputMode={inputMode}
          pattern={pattern}
          ref={forwardRef}
        />
        {isClearButtonVisible && (
          <Icon
            className={`${blockName}-ClearIcon`}
            modifiers={[["type", "clear"]]}
            onClick={handleClear}
          />
        )}
      </div>
      {labelAfter.text && (
        <label
          htmlFor={id}
          className={`${labelAfter.className} Text ${processModifiers(
            "Text",
            labelAfter.modifiers
          )}`}
        >
          {labelAfter.text}
        </label>
      )}
    </>
  );
}

export default Input;
