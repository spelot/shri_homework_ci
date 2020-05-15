export default (
  blockName = "",
  modifiers: Array<Array<string | undefined | false | null>> = []
) =>
  modifiers
    .map(
      ([modifierName, modifierValue]) =>
        `${blockName}_${modifierName}${
          [undefined, false, null, ""].includes(modifierValue)
            ? ""
            : `_${modifierValue}`
        }`
    )
    .join(" ");
