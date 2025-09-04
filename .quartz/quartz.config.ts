import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Meridian-Quartz Configuration
 * 
 * Key differences from vanilla Quartz:
 * - Content sourced from parent directory (workspace root)
 * - Meridian-specific ignore patterns
 * - Pre-configured for .quartz/ installation location
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Home",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "https://rarecompute.github.io/website",
    ignorePatterns: [
      // Quartz infrastructure
      ".quartz/**",
      ".quartz-cache/**",
      
      // Meridian infrastructure  
      ".meridian/**",
      
      // Development infrastructure
      ".git/**",
      ".gitignore",
      "node_modules/**",
      "package*.json",
      "yarn.lock",
      "tsconfig*.json",
      "*.config.{js,ts}",
      "vite.config.{js,ts}",
      "rollup.config.{js,ts}",
      "webpack.config.{js,ts}",
      
      // Build and temporary
      "dist/**",
      "build/**", 
      "cache/**",
      "*.log",
      "tmp/**",
      "temp/**",
      ".cache/**",
      
      // IDE and system
      ".vscode/**",
      ".idea/**",
      "*.swp",
      "*.swo", 
      ".DS_Store",
      "Thumbs.db",
      
      // Backup files
      "*~",
      "*.bak",
      "*.tmp",
      
      // Private content
      "private/**",
      "templates/**",
      ".obsidian/**",
      
      // Common documentation that shouldn't be published
      "CHANGELOG.md",
      "CONTRIBUTING.md",
      "INSTALL.md",
      "TODO.md",
      "ROADMAP.md",
    ],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "rgba(243, 227, 250, 1)",
          lightgray: "rgba(208, 183, 219, 1)",
          gray: "rgba(199, 145, 222, 1)",
          darkgray: "rgba(135, 61, 167, 1)",
          dark: "rgb(42, 3, 59)",
          secondary: "rgba(104, 26, 137, 1)",
          tertiary: "rgb(156, 26, 113)",
          highlight: "rgba(224, 106, 248, 0.15)",
        },
        darkMode: {
          light: "rgb(42, 3, 59)",
          lightgray: "rgba(135, 61, 167, 1)",
          gray: "rgba(243, 227, 250, 1)",
          darkgray: "rgba(208, 183, 219, 1)",
          dark: "rgba(243, 227, 250, 1)",
          secondary: "rgba(243, 227, 250, 1)",
          tertiary: "rgb(156, 26, 113)",
          highlight: "rgba(224, 106, 248, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "filesystem"] }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({ 
        theme: { light: "github-light", dark: "github-dark" }, 
        keepBackground: false 
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
