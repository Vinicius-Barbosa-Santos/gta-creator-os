import type { MetadataRoute } from "next";
import { editorialGuides } from "./guias/editorial-guides";
import { beginnerCoursePath, captureGuidePath, siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/noticias", "/guias", beginnerCoursePath, captureGuidePath, "/guias/gameplay-para-short", ...editorialGuides.map(({ slug }) => `/guias/${slug}`)].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
