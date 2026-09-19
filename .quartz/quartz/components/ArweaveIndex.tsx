import { QuartzComponent, QuartzComponentProps } from "./types"
import style from "./styles/arweaveindex.scss"
import { getContentTypeProfile } from "../contentType"

interface ArweaveHashEntry {
  txId: string
  uploadedAt?: string
  link: string
}

function normalizeHashEntry(raw: unknown): ArweaveHashEntry | null {
  if (!raw || typeof raw !== "object") return null
  const record = raw as Record<string, unknown>
  const txId = String(record.txId ?? record.hash ?? "").trim()
  if (!txId) return null
  const uploadedAtRaw = record.uploadedAt ?? record.timestamp
  const uploadedAt =
    uploadedAtRaw !== undefined && uploadedAtRaw !== null && String(uploadedAtRaw).trim() !== ""
      ? String(uploadedAtRaw).trim()
      : undefined
  return {
    txId,
    uploadedAt,
    link: `https://www.arweave.net/${txId}`,
  }
}

function ArweaveIndex(): QuartzComponent {
  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData } = props
    const showArchive = getContentTypeProfile(fileData).showArchive

    if (!showArchive) {
      return null
    }

    const rawHashes = fileData?.frontmatter?.["arweave-hashes"]
    if (!Array.isArray(rawHashes)) {
      return null
    }

    const hashes = rawHashes
      .map(normalizeHashEntry)
      .filter((entry): entry is ArweaveHashEntry => entry !== null)

    if (!hashes.length) {
      return null
    }

    // Sort by uploadedAt, newest first; entries without a date sort last
    const sortedHashes = [...hashes].sort((a, b) => {
      const aTime = a.uploadedAt ? new Date(a.uploadedAt).getTime() : Number.NEGATIVE_INFINITY
      const bTime = b.uploadedAt ? new Date(b.uploadedAt).getTime() : Number.NEGATIVE_INFINITY
      return bTime - aTime
    })

    return (
      <div class="arweave-history">
        <h3>Version History</h3>
        <div class="arweave-list">
          {sortedHashes.map((entry, idx) => {
            const formattedDate = entry.uploadedAt
              ? new Date(entry.uploadedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                  timeZoneName: "short",
                })
              : "Unknown date"

            return (
              <div class="arweave-entry" key={idx}>
                <div class="arweave-timestamp">{formattedDate}</div>
                <div class="arweave-actions">
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="arweave-link"
                    title="Visit file on Arweave"
                    aria-label="Visit file on Arweave"
                    style={{ padding: "8px", display: "inline-flex" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="external-link-icon"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  Component.css = style
  return Component
}

export default ArweaveIndex
