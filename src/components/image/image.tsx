import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { getPixels } from "@unpic/pixels";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { type ImageProps, Image as OptimizedImage } from "@unpic/qwik";
import { encode } from "blurhash";

const processImage = server$(async (imgUrl: string) => {
  const heroData = await getPixels(imgUrl);

  const data = Uint8ClampedArray.from(heroData.data);
  const blurHash = encode(data, heroData.width, heroData.height, 4, 4);

  return blurHash;
})

export const Image = component$<ImageProps>((props: ImageProps) => {
  const blurHashData = useSignal("");

  useTask$(async () => {
    blurHashData.value = blurhashToCssGradientString(await processImage(props.src));
  });

  return (
    <OptimizedImage
      {...props}
      background={blurHashData.value}
    />
  );
});