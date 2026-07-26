import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "HeyYarvis — Your second brain, accessible by voice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoPath = join(process.cwd(), "public/brand/logo-mark.png");
  const logoSrc = `data:image/png;base64,${readFileSync(logoPath).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0d",
          backgroundImage:
            "radial-gradient(circle at 50% 28%, rgba(217,164,65,0.18), transparent 60%)",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={96}
          height={96}
          style={{ borderRadius: 9999, marginBottom: 36 }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 68,
            color: "#f5f4f0",
            fontWeight: 600,
            letterSpacing: -1.5,
          }}
        >
          HeyYarvis
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 32,
            color: "#9c99a8",
          }}
        >
          Your second brain, accessible by voice
        </div>
      </div>
    ),
    { ...size }
  );
}
