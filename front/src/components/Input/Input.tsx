import React, { useState } from "react";
import Icon from "../Icon/Icon";
import processModifiers from "../../utils/processModifiers";
import "./Input.scss";
import { useSelector } from "react-redux";
import { DefaultProps } from "../../types/defaultProps";
import { getIsInProgress } from "../../store/reducers/commonReducer";

export interface InputProps extends DefaultProps {
  labelBefore?: {
    text: string | boolean;
    className: string;
    modifiers: string[][];
  };
  labelAfter?: {
    text: string | boolean;
    className: string;
    modifiers: string[][];
  };
  id: string;
  type?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  inputMode?:
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  value?: string;
  pattern?: string;
  forwardRef: React.RefObject<HTMLInputElement>;
}

function Input(props: InputProps) {
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
    placeholder,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValueFromState(event.target.value);
  const handleClear = () => setValueFromState("");

  const isInProgress = useSelector(getIsInProgress);

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
