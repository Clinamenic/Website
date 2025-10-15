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
| `structuredData`  | `<script type="application/ld+json">`                                | `object`\|`string`   | **Highly Rec.** | **Crucial for rich results.** JSON-LD structured data object or a stringified JSON object. Enables rich snippets (ratings, FAQs, article info, etc.) in search results. See schema.org for types.                         |
| `headIcon`        | `<link rel="icon">`                                                  | `string`             | Optional        | Path (absolute or relative) to the favicon. Defaults to `static/icon.png`.                                                                                                                                                |

**Note:** `headIcon` exists but had type errors in the provided context. `bannerURI` also had potential type issues related to absolute/relative URL handling that should be resolved in `Head.tsx`.

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
canonicalUrl: "https://clinamenic.com/design" # Explicit canonical URL
structuredData:
  "@context": "https://schema.org"
  "@type": "CollectionPage"
  "name": "Clinamenic Design Portfolio"
  "description": "A showcase of innovative graphic design and branding projects by Clinamenic LLC. Discover logos, diagrams, and more."
  "url": "https://clinamenic.com/design"
  "publisher":
    "@type": "Organization"
    "name": "Clinamenic LLC"
    "logo":
      "@type": "ImageObject"
      "url": "https://clinamenic.com/static/icon.png"
  # Example of breadcrumbs within the same script
  "breadcrumb":
    "@type": "BreadcrumbList"
    "itemListElement":
      - "@type": "ListItem"
        "position": 1
        "name": "Home"
        "item": "https://clinamenic.com/"
      - "@type": "ListItem"
        "position": 2
        "name": "Design Portfolio"
        "item": "https://clinamenic.com/design"
---
Page content starts here...
```

## 6. Implementation Notes

- The `quartz/components/Head.tsx` component needs to be **thoroughly reviewed and updated** to:
  - Correctly parse all the fields listed above, applying the specified defaults.
  - Reliably handle both absolute and relative URLs for `bannerURI`, `canonicalUrl`, `ogUrl`, and `headIcon`.
  - **Robustly handle `structuredData`**: Ensure it correctly stringifies JSON objects and embeds them within the `<script type="application/ld+json">` tag. Consider a dedicated helper function or integrating a schema builder library if complexity increases.
- **Address TypeScript errors**: Fix the type errors noted in `Head.tsx` related to `headIcon`, `bannerURI`, `ogImagePath`, and `iconPath`. Prioritize type safety, using type guards, optional chaining (`?.`), and nullish coalescing (`??`) appropriately when accessing potentially undefined frontmatter properties.
- **Validation:** Consider adding warnings during the build process if required fields (`title`, `headDescription`) are missing or if `structuredData` fails basic validation (e.g., cannot be parsed as JSON).
- **Default `ogType`**: Implement logic to default `ogType` to 'article' for most pages but potentially 'website' for the root index page.
