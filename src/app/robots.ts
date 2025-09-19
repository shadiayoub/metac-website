import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/private/",
        "/public/",
        "/_next/",
        "/api/",
        "/404/",
        "/500/",
        "/_error/",
        "/sitemap.xml",
      ],
    },
    sitemap: "https://metacces.com/sitemap.xml",
  };
}
