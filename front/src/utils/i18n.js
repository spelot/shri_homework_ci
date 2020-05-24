function pForm(count) {
  const lastNumber = count % 10;
  const lastNumbers = count % 100;

  if (lastNumber === 1 && lastNumbers !== 11) {
    return "one";
  }
  if (
    lastNumber > 1 &&
    lastNumber < 5 &&
    (lastNumbers < 10 || lastNumbers > 20)
  ) {
    return "few";
  }
  return "many";
}

const forms = {
  ru: pForm,
  en: (count) => (count === 1 ? "one" : "other"),
};

function generateText(msg, params) {
  const res = [];
  let tmp = "";
  for (const char of msg) {
    switch (char) {
      default:
        tmp += char;
        break;
      case "{":
        res.push(tmp);
        tmp = "";
        break;
      case "}":
        res.push(params[tmp]);
        tmp = "";
        break;
    }
  }
  tmp && res.push(tmp);
  return res.join("");
}

function i18n(dictionary, lang = "en", key, params) {
  const value = dictionary[key];

  if (typeof value === "string") {
    return generateText(value, params);
  }

  const form = value[forms[lang](params.count)];
  return generateText(form, params);
}

export default i18n;
