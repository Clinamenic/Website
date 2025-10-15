# Bluesky Post Templates for Quartz Content

This document defines different templates for constructing Bluesky posts based on the type of Quartz content being shared.

The staging script (`scripts/stage-bsky.ts`) will use these templates to format the post text.

## Template Identification

We need a way to determine which template to use for a given file. Potential methods:

1.  **Frontmatter Field:** Add a `postTemplate: publication | service | ...` field to the Markdown frontmatter.
2.  **Directory Structure:** Infer based on the file's directory (e.g., files in `content/services/` use the 'service' template).
3.  **User Prompt:** Ask the user to select a template during script execution.

_(Decision needed on which method to implement)_

---

## 1. Publication Template (Default)

**Purpose:** For standard articles, blog posts, essays, notes, etc.

**Frontmatter Fields Used:**

- `title` (Required, fallback to filename)
- `subtitle` or `description` (Optional)
- `keywords` or `tags` (Optional, for hashtags)
- `language` (Optional, for `--lang` flag)

**Post Format:**

```
{title}

{subtitle_or_description (truncated)}

{article_url}

#{tag1} #{tag2} ...
```

**Example Output:**

```
This is the Article Title

A brief description or subtitle goes here...

https://www.clinamenic.com/writing/this-is-the-article-title

#TagName #AnotherTag
```

---

## 2. Service Template

**Purpose:** For pages describing specific service offerings.

**Frontmatter Fields Used:**

- `title` (Required, should be the service name)
- `serviceTeaser` (Optional, short tagline/teaser for the service)
- `keywords` or `tags` (Optional, relevant service-related tags)
- `language` (Optional)

**Post Format:**

```
Now Offering: {title}

{serviceTeaser (if available)}

Learn more:
{article_url}

#{tag1} #{tag2} ...
```

**Example Output:**

```
Now Offering: Custom Zettelkasten Consulting

Build your second brain with expert guidance.

Learn more:
https://www.clinamenic.com/services/zettelkasten-consulting

#Consulting #PKM #Zettelkasten
```

---
