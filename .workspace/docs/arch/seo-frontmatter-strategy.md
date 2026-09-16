# SEO Frontmatter Strategy for Quartz

## 1. Introduction

This document outlines a standardized approach for defining Search Engine Optimization (SEO) and social media sharing metadata within the frontmatter of Markdown content files in this Quartz workspace. The goal is to significantly enhance the **discoverability and rich presentation** of individual pages across search engines (like Google) and social platforms by leveraging the `quartz/components/Head.tsx` component.

## 2. Core Principles

- **Centralized Control:** SEO-related metadata should primarily be controlled via frontmatter properties in the relevant `.md` file.
- **Leverage `Head.tsx`:** The `Head.tsx` component is responsible for parsing these frontmatter properties and generating the corresponding HTML `<head>` tags.
- **Defaults and Overrides:** Sensible defaults should be provided by `Head.tsx` or the global configuration (`quartz.config.ts`), but page-specific frontmatter should always take precedence.
- **Consistency:** Adhering to this standard ensures consistent metadata across the site.
- **Focus on Richness:** Prioritize metadata that enables rich snippets and enhanced previews in search results and social feeds (primarily through structured data and Open Graph/Twitter tags).

## 3. Frontmatter Fields for SEO

The following frontmatter keys are proposed to control SEO and social sharing metadata. `Head.tsx` should be updated or verified to support these fields.

| Frontmatter Key   | HTML Tag(s)                                                          | Type                 | Status          | Description & Default Behavior                                                                                                                                                                                            |
| :---------------- | :------------------------------------------------------------------- | :------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`           | `<title>`, `og:title`, `twitter:title`                               | `string`             | **Required**    | The main title of the page. Used by search engines and social platforms. Keep concise and relevant. Already used by Quartz.                                                                                               |
| `headDescription` | `<meta name="description">`, `og:description`, `twitter:description` | `string`             | **Required**    | A concise summary (150-160 characters) of the page content, used for search snippets and social previews. Falls back to `subtitle` or `fileData.description` if not present.                                              |
| `bannerURI`       | `og:image`, `twitter:image`                                          | `string`             | **Highly Rec.** | URL (absolute or relative to site base) for the page's primary image. Crucial for social sharing previews. **Recommend 1.91:1 aspect ratio (e.g., 1200x630px)**. Defaults to a site-wide OG image if not provided.        |
| `keywords`        | `<meta name="keywords">`                                             | `string[]`\|`string` | Optional        | List of relevant keywords. Comma-separated if string. **Note:** Major search engines like Google give little to no direct ranking weight to this tag, but it _may_ be used by other systems or for internal organization. |
| `canonicalUrl`    | `<link rel="canonical">`                                             | `string`             | Optional        | The definitive URL for the page, crucial for preventing duplicate content issues. Defaults to the page's standard URL.                                                                                                    |
| `ogType`          | `<meta property="og:type">`                                          | `string`             | Optional        | Open Graph object type (e.g., 'article', 'website', 'book', 'profile'). **Defaults to 'article' for most content pages**, 'website' for homepage/root.                                                                    |
| `ogSiteName`      | `<meta property="og:site_name">`                                     | `string`             | Optional        | The name of the overall website (e.g., "Clinamenic LLC"). Defaults to `cfg.pageTitle`.                                                                                                                                    |
| `ogUrl`           | `<meta property="og:url">`                                           | `string`             | Optional        | Explicit Open Graph URL. Defaults to the `canonicalUrl` or the page's standard URL.                                                                                                                                       |
| `twitterCard`     | `<meta name="twitter:card">`                                         | `string`             | Optional        | Twitter card type ('summary', 'summary_large_image', 'app', 'player'). Defaults to **'summary_large_image' if `bannerURI` is present, 'summary' otherwise.**                                                              |
| `twitterSite`     | `<meta name="twitter:site">`                                         | `string`             | Optional        | The Twitter handle of the site owner/publisher (e.g., '@clinamenic').                                                                                                                                                     |
| `twitterCreator`  | `<meta name="twitter:creator">`                                      | `string`             | Optional        | The Twitter handle of the content author (e.g., '@gidworks').                                                                                                                                                             |
| `structuredData`  | `<script type="application/ld+json">`                                | `object`\|`string`   | Optional override | Deep-merged over auto-generated schema from `type` (see Auto schema below). Frontmatter keys win. |
| `headIcon`        | `<link rel="icon">`                                                  | `string`             | Optional        | Path (absolute or relative) to the favicon. Defaults to `static/icon.png`.                                                                                                                                                |

### Auto schema (Head.tsx / `util/structuredData.ts`)

`Head` builds a baseline JSON-LD object from `frontmatter.type`, then deep-merges any `structuredData` override on top:

| `type` | Auto `@type` |
| ------ | ------------ |
| `homepage` (or slug `index`) | `@graph` of `WebSite` + `Organization` |
| `writing`, `publication` | `BlogPosting` (author, dates, image, `isBasedOn` from `publication-url` when set) |
| `service` | `Service` |
| `site-page` and other indexable types | `WebPage` |
| `zettel`, `text` | none (no auto schema) |

Defaults when omitted: `ogType` is `article` for writing/publication, `website` for homepage/site-page/service; `twitter:site` is `@clinamenic`.

## 4. Best Practices for Rich Discoverability

To maximize how search engines understand and display your content:

1. **Core Metadata:** Ensure `title` and `headDescription` are accurate, compelling, and unique for each page.
2. **Visual Previews:** Provide a high-quality `bannerURI` optimized for sharing (e.g., 1200x630px).
3. **Structured Data (JSON-LD):** This is key. Implement relevant and **valid** structured data using schema.org vocabulary. Common useful types include:
   - `Article` (for blog posts, notes)
   - `BreadcrumbList` (for site navigation context)
   - `WebSite` (for site-wide search box)
   - `Organization` / `Person` (to identify the publisher/author)
   - `CollectionPage` (for portfolio or index pages)
   - **Validate** your structured data using tools like [Google's Rich Results Test](https://search.google.com/test/rich-results).
4. **Canonicalization:** Use `canonicalUrl` correctly if content might be accessible via multiple URLs.
5. **Open Graph / Twitter Cards:** Ensure OG and Twitter tags (especially title, description, image) are correctly populated for appealing social media previews.

## 5. Example Frontmatter

```yaml
---
title: My Awesome Design Portfolio Page
headDescription: A showcase of innovative graphic design and branding projects by Clinamenic LLC. Discover logos, diagrams, and more (155 chars).
bannerURI: /assets/images/design-portfolio-banner-1200x630.png
keywords: [graphic design, branding, logo design, portfolio, clinamenic] # Optional, low SEO impact
ogType: CollectionPage # More specific than 'article' for a portfolio
twitterCard: summary_large_image
twitterSite: "@clinamenic"
twitterCreator: "@gidworks"
canonicalUrl: "https://www.ssc.studio/design" # Explicit canonical URL
structuredData:
  "@context": "https://schema.org"
  "@type": "CollectionPage"
  "name": "Clinamenic Design Portfolio"
  "description": "A showcase of innovative graphic design and branding projects by Clinamenic LLC. Discover logos, diagrams, and more."
  "url": "https://www.ssc.studio/design"
  "publisher":
    "@type": "Organization"
    "name": "Clinamenic LLC"
    "logo":
      "@type": "ImageObject"
      "url": "https://www.ssc.studio/static/icon.png"
  # Example of breadcrumbs within the same script
  "breadcrumb":
    "@type": "BreadcrumbList"
    "itemListElement":
      - "@type": "ListItem"
        "position": 1
        "name": "Home"
        "item": "https://www.ssc.studio/"
      - "@type": "ListItem"
        "position": 2
        "name": "Design Portfolio"
        "item": "https://www.ssc.studio/design"
---
Page content starts here...
```

## 6. Implementation Notes

- Auto schema and merge live in `quartz/util/structuredData.ts`, wired from `quartz/components/Head.tsx`.
- Prefer omitting `ogType` on essays so Head defaults to `article`; do not set `ogType: website` on `type: writing` pages.
- Prefer omitting `structuredData` on typical essays — `BlogPosting` is generated from title, description, author, dates, and image.
- Use `structuredData` on section pages (about, writing portfolio, services) to specialize `@type` (e.g. `AboutPage`); it deep-merges over the auto `WebPage` baseline.
- **Index policy** (`quartz/util/indexPolicy.ts`): `type: zettel` is `noindex` and excluded from sitemap/RSS by default. Set `index: true` to opt a note back into crawl discovery. `index: false` forces noindex on any type. FlexSearch stays off for all zettel (`searchable: false`).
- Run `npm run seo:lint` to warn on published `{writing, service, site-page, publication, project}` pages missing `headDescription` (warn-only; does not fail the build).
- Root [`llms.txt`](../../llms.txt) is a curated agent entry map (hubs, flagship essays, sitemap/RSS/searchIndex, UUID citation note). Revisit quarterly; it is not a ranking signal.
