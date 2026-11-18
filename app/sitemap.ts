import type { MetadataRoute } from "next";
import { captureGuidePath, siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/noticias", "/guias", captureGuidePath].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
