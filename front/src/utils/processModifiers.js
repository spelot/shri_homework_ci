export default (blockName = "", modifiers = []) =>
  modifiers
    .map(
      ([modifierName, modifierValue]) =>
        `${blockName}_${modifierName}${
          [undefined, false, null].includes(modifierValue)
            ? ""
            : `_${modifierValue}`
        }`
    )
    .join(" ");
