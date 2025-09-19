import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const website = "https://metacces.com";

  return [
    {
      url: website,
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
