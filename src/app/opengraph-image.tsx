import { ImageResponse } from "next/og";

export const alt = "MOAR Router — Cross-Model Context Orchestration";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function loadFont() {
  const res = await fetch(
    "https://github.com/google/fonts/raw/main/ofl/pressstart2p/PressStart2P-Regular.ttf",
  );
  if (!res.ok) {
    throw new Error(`Failed to load font: ${res.status}`);
  }
  return res.arrayBuffer();
}

export default async function Image() {
  const font = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#000000",
          padding: "72px 80px",
          color: "#39ff14",
          fontFamily: "Press Start 2P",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontSize: 72,
            lineHeight: 1.15,
            letterSpacing: 2,
          }}
        >
          <div>MOAR</div>
          <div>Router</div>
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            fontSize: 22,
            lineHeight: 1.5,
            color: "rgba(57, 255, 20, 0.75)",
            maxWidth: 900,
          }}
        >
          Cross-model context orchestration
        </div>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            fontSize: 18,
            color: "rgba(255, 255, 255, 0.55)",
          }}
        >
          moar-router.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Press Start 2P",
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
