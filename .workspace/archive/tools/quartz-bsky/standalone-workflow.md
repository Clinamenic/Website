# Standalone Quartz-to-Bluesky Staging Tool Workflow

## 1. Goal

To provide a standalone command-line tool that automates posting to Bluesky using the `bkyl` CLI based on content from a selected Quartz article. The tool will allow users to choose an article, automatically construct the post text with relevant links and tags, and execute the post command after confirmation.

## 2. Feasibility

This approach is highly feasible and well-suited to the `bkyl` CLI's capabilities. `bkyl post` accepts text directly via arguments and handles link/tag detection, enabling a more automated flow compared to tools requiring interactive TUI composition.

## 3. Workflow Steps

1.  **Tool Invocation:**

    - The user runs a dedicated command in the terminal within their Quartz project workspace (e.g., `npm run stage-bsky`, `yarn stage-bsky`, or a custom script command like `node scripts/stage-bsky.js`).

2.  **Configuration & Authentication Check:**

    - The tool reads necessary configuration:
      - Path to the Quartz content directory (e.g., `./content`).
      - Site's base URL (e.g., `https://your.site`) - potentially read from `quartz.config.ts`.
      - Path to the `bkyl` executable (if not in the system PATH).
    - **Authentication:** The tool checks if Bluesky credentials are accessible to `bkyl` (via environment variables `BSKY_USER`/`BSKY_PASSWORD` or `~/.config/bkyl/config.yaml`). If not detected, it should inform the user and suggest running `bkyl login` first, then exit.

3.  **File Discovery:**

    - The tool recursively scans the configured content directory for all Markdown files (`.md`).

4.  **Interactive Menu (TUI):**

    - Using a library like `inquirer` (Node.js), the tool displays a searchable/filterable list of the discovered Markdown file paths.
    - Example menu prompt: `? Select the article to post to Bluesky: (Use arrow keys)`

5.  **File Selection:**

    - The user navigates and selects the desired Markdown file.

6.  **Frontmatter Parsing:**

    - The tool reads the contents of the selected `.md` file.
    - It uses a YAML frontmatter parsing library (like `gray-matter`) to extract the frontmatter.

7.  **Data Extraction & URL Construction:**

    - Extracts relevant fields: `title`, `subtitle`/`description`, `keywords`/`tags`, `language`, and the file's `slug`.
    - Constructs the full public URL for the article: `${baseUrl}/${slug}.html`.

8.  **Bluesky Post Text Construction:**
    - The tool automatically formats the post text. This format could be standardized or made configurable:
    ```
    {title}
    ```

{subtitle_or_excerpt (optional, truncated if needed)}

{article_url}

#{tag1} #{tag2} ...
```    *   URLs and`#hashtags`included in this text string will be automatically processed into links and tags by`bkyl`.

9.  **Confirmation Prompt:**

    - The tool displays the fully constructed post text and asks for user confirmation before executing the command:

    ```
    --------------------------------------
    Post to Bluesky:
    --------------------------------------
    Malattunement before Malice

    Micropolitical considerations on community security...

    https://your.site/path/to/samplepost.html

    #Education_for_Peace #Community_Development #Org_Management
    --------------------------------------
    ? Post the above text to Bluesky? (Y/n)
    ```

10. **Execute `bkyl post`:**

    - If the user confirms (e.g., enters 'y' or presses Enter),
      the tool executes the `bkyl post "<constructed_post_text>"` command using `child_process.spawn` or equivalent.
    - If a language code (e.g., `en`) was found in the frontmatter (`language` field), it appends the `--lang <language_code>` argument.
    - _(Future Enhancement: Could check for a `bannerURI` or similar field and add `--image <path_or_url>` if the image exists locally or needs downloading)._

11. **Output Result:**

    - The tool captures and displays the standard output and standard error streams from the `bkyl post` command.
    - This will show the success message (including the AT URI of the new post) or any error messages from `bkyl`.

12. **Tool Completion:**
    - The staging tool script finishes its execution.

## 4. Advantages of this Approach

- **More Automated:** Leverages `bkyl`'s command-line arguments to avoid manual copy-pasting.
- **Decoupled:** Operates independently of the `npx quartz build` process.
- **On-Demand:** Run only when the user explicitly wants to post.
- **User Control:** User selects the article and confirms the final text.
- **Format Consistency:** Ensures posts generated from articles follow a consistent format.

## 5. Disadvantages

- **Requires `bkyl` Setup:** The user must have the `bkyl` CLI installed and authenticated beforehand.
- **Requires Separate Execution:** User needs to remember to run this tool.

## 6. Potential Implementation Details

- **Language:** Node.js/TypeScript.
- **Libraries:**
  - File System access (`fs`).
  - Interactive TUI prompts (`inquirer` or `enquirer`).
  - Frontmatter parsing (`gray-matter`).
  - Executing external commands (`child_process`).
  - Checking environment variables (`process.env`).
- **Location:** `scripts/stage-bsky.js` (or similar) within the Quartz project.
- **Configuration:** Minimal needed if relying on `bkyl`'s config/env vars and reading `quartz.config.ts`.
