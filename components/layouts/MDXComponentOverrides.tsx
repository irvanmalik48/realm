import Image, { ImageProps } from "next/image";

export const ResponsiveImage = (props: ImageProps) => {
  return (
    <Image
      {...props}
      className="w-full rounded-lg"
      width={720}
      height={720}
      alt={props.alt}
    />
  );
};

export const components: {} = { img: ResponsiveImage };
