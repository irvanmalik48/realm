export default function Thumbnail(
  titleP: string | undefined,
  dateP: string | undefined,
  tagsP: string | string[] | undefined
) {
  // check if tags are string / string[] / undefined
  let processedTags = "";
  if (tagsP == undefined) {
    processedTags = "";
  } else if (typeof tagsP === "string") {
    processedTags = `tags=${tagsP}&`;
  } else {
    processedTags += tagsP?.map((values: string): string | undefined => {
      if (values != "") return `tags=${values}&`;
    });
    processedTags = processedTags.replace(/,/g, "");
  }

  // encode special characters used in my post slug to HTML encoding UTF-8 format
  const processedTitle = titleP == undefined ? "" : encodeURIComponent(titleP);
  const nameText = encodeURIComponent("Irvan Malik Azantha");
  const emailText = encodeURIComponent("irvanmalik48@gmail.com");
  const dateText =
    dateP == undefined ? encodeURIComponent("-") : encodeURIComponent(dateP);
  const colorHex = "88c0d0";

  // process it
  const title = `title=${processedTitle}&`;
  const name = `name=${nameText}&`;
  const email = `email=${emailText}&`;
  const date = `date=${dateText}&`;
  const color = `color=${colorHex}&`;
  const tags = `${processedTags}`;

  const all = `https://api.irvanma.me/api/index?${title}${name}${email}${date}${color}${tags}`;

  return all;
}
