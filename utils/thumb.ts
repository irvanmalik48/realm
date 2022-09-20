import { colorScheme, currentColorScheme } from "@utils/colors.ts";

export default function Thumbnail(
  titleP?: string,
  dateP?: string,
  tagsP?: string | string[],
) {
  let processedTags = "";
  if (tagsP === undefined) {
    processedTags = "";
  } else if (typeof tagsP === "string") {
    processedTags = `tags=${tagsP}&`;
  } else {
    processedTags += tagsP?.map((values: string): string | undefined => {
      if (values != "") return `tags=${values}&`;
    });
    processedTags = processedTags.replace(/,/g, "");
  }

  const processedTitle = titleP ? "" : encodeURIComponent(titleP as string);
  const nameText = encodeURIComponent("Irvan Malik Azantha");
  const emailText = encodeURIComponent("irvanmalik48@gmail.com");
  const dateText = dateP == undefined
    ? encodeURIComponent("-")
    : encodeURIComponent(dateP);
  const colorHex = colorScheme[currentColorScheme].dark.accent.solid.replace(
    "#",
    "",
  );

  const title = `title=${processedTitle}&`;
  const name = `name=${nameText}&`;
  const email = `email=${emailText}&`;
  const date = `date=${dateText}&`;
  const color = `color=${colorHex}&`;
  const tags = `${processedTags}`;

  const all =
    `https://api.irvanma.me/api/index?${title}${name}${email}${date}${color}${tags}`;

  return all;
}
