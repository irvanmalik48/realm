/** @jsxImportSource react */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { RequestHandler } from "@builder.io/qwik-city";
import { ImageResponse } from "@vercel/og";
import { twMerge } from "tailwind-merge";

export const config = {
  runtime: "edge",
};

export const onGet: RequestHandler = async ({ query, send }) => {
  const title = query.get("title") ?? "Untitled";
  const desc = query.get("desc") ?? "No description";

  const fontDataHeading = await fetch(
    "http://localhost:5173/fonts/Hubot-Sans-Bold.ttf"
  ).then((res) => res.arrayBuffer());

  const fontDataSans = await fetch(
    "http://localhost:5173/fonts/Mona-Sans-Regular.ttf"
  ).then((res) => res.arrayBuffer());

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#f5f5f5",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <svg
          tw="absolute -top-8 text-neutral-900 w-200 h-200 -right-12 text-opacity-30"
          viewBox="0 0 850 850"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={[
              "M454.236",
              "111.012H533.918L422.907",
              "0L311.895",
              "111.012H391.439V360.342L274.108",
              "243.01L316.207",
              "200.911H198.901V318.217L240.929",
              "276.189L358.271",
              "393.532H111.012V313.85L0",
              "424.862L111.012",
              "535.873V456.33H360.341L243.01",
              "573.661L200.911",
              "531.561V648.867H318.217L276.189",
              "606.84L391.439",
              "491.591V738.988H313.988L425",
              "850L536.012",
              "738.988H454.236V489.497L572.721",
              "607.982L531.8",
              "648.903H649.106V531.597L605.9",
              "574.803L487.427",
              "456.33H738.988V533.78L850",
              "422.769L738.988",
              "311.757V393.532H489.497L607.982",
              "275.048L648.903",
              "315.969V198.663H531.597L574.803",
              "241.868L454.236",
              "362.435V111.012Z",
            ].join(" ")}
            fill="currentColor"
          />
        </svg>
        <div
          tw={twMerge(
            "absolute inset-x-0 bottom-0 border-t-4 border-neutral-800",
            "w-full flex justify-center items-start flex-col px-10",
            "py-8 bg-neutral-900"
          )}
        >
          <h1
            tw="m-0 mb-3 text-5xl font-bold"
            style={{
              fontFamily: "Hubot Sans",
            }}
          >
            {title}
          </h1>
          <p
            tw="m-0 text-2xl truncate"
            style={{
              fontFamily: "Mona Sans",
            }}
          >
            {desc}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Hubot Sans",
          data: fontDataHeading,
          weight: 700,
        },
        {
          name: "Mona Sans",
          data: fontDataSans,
          weight: 400,
        },
      ],
    }
  );

  send(image as Response);
};
