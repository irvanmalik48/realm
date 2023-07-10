import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { getPixels } from "@unpic/pixels";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { type ImageProps, Image as OptimizedImage } from "@unpic/qwik";
import { encode } from "blurhash";

export const Image = component$<ImageProps>((props: ImageProps) => {
  const blurHashData = useSignal("");

  useTask$(async () => {
    const heroData = await getPixels(props.src);

    const data = Uint8ClampedArray.from(heroData.data);
    const blurHash = encode(data, heroData.width, heroData.height, 4, 4);
    blurHashData.value = blurhashToCssGradientString(blurHash);
  });

  return (
    <OptimizedImage
      {...props}
      background={blurHashData.value}
    />
  );
});