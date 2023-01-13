import { ImageResponse } from "@vercel/og";
import { NextApiRequest } from "next";

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextApiRequest
) {
  const { searchParams } = new URL(req.url || '');

  const hasTitle = searchParams.has('title');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'The Realm';

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          letterSpacing: "-.02em",
          background: "#171717",
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              background: "#5EEAD4",
              borderRadius: "99px",
            }}
          />
          <span
            style={{
              marginLeft: 16,
              fontSize: 20,
              color: "white",
            }}
          >
            Irvan Malik
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            padding: "42px",
            fontSize: 36,
            color: "#171717",
          }}
          tw="w-full overflow-hidden bg-teal-300"
        >
          {title}
        </div>
      </div>
    ), {
      width: 1200,
      height: 627,
    }
  );
}
