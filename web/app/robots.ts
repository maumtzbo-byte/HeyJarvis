import type { MetadataRoute } from "next";

const siteUrl = "https://hey-jarvis-psi.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
