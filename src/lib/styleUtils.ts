export const genFontSize = (size: string | undefined) => {
  let fontSize;
  switch (size) {
    case "sm":
      fontSize = "text-sm";
      break;
    case "lg":
      fontSize = "text-lg";
      break;
    case "xl":
      fontSize = "text-xl";
      break;
    case "2xl":
      fontSize = "text-2xl";
      break;
    case "3xl":
      fontSize = "text-3xl";
      break;
    case "4xl":
      fontSize = "text-4xl";
      break;
    case "5xl":
      fontSize = "text-5xl";
      break;
    case "super":
      fontSize = "text-8xl";
      break;
    default:
      fontSize = "text-md";
      break;
  }
  return fontSize;
};

export const genFontColor = (color: string | undefined) => {
  let fontColor;
  switch (color) {
    case "primary":
      fontColor = "text-french-blue";
      break;
    case "white":
      fontColor = "text-white";
      break;
    case "black":
      fontColor = "text-black";
      break;
    case "light":
      fontColor = "text-white dark:text-black";
      break;
    case "warning":
      fontColor = "text-pallete-orange";
      break;
    default:
      fontColor = "text-black dark:text-white";
      break;
  }
  return fontColor;
};

export const genBgColor = (color: string | undefined) => {
  let bgColor;
  switch (color) {
    case "primary":
      bgColor = "bg-french-blue";
      break;
    case "light":
      bgColor = "bg-light-gray";
      break;
    case "warning":
      bgColor = "bg-pallete-orange";
      break;
    default:
      bgColor = "bg-black";
      break;
  }
  return bgColor;
};
