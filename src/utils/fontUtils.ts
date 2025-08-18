export function getFontInfo(url: string) {
  const ext = url.split('.').pop()?.toLowerCase() || "ttf";
  let format: string;

  switch (ext) {
    case "otf":
      format = "opentype";
      break;
    case "woff":
      format = "woff";
      break;
    case "woff2":
      format = "woff2";
      break;
    default:
      format = "truetype";
  }

  return { ext, format };
}
