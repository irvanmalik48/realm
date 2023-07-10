import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { type ImageProps, Image as OptimizedImage } from "@unpic/qwik";

const processImage = server$(async (imgUrl: string) => {
  const blurhashFetch = await fetch(`${imgUrl}?fm=blurhash`).then((res) => res.text());

  return blurhashFetch;
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