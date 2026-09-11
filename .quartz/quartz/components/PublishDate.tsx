import { QuartzComponentConstructor, QuartzComponent } from "./types"
import type { QuartzPluginData } from "../plugins/vfile"
import "./styles/publishdate.scss"

interface PublishDateOptions {
  showDate?: (fileData: QuartzPluginData) => boolean
}

const defaultOptions: PublishDateOptions = {
  showDate: () => true,
}

export default ((opts?: PublishDateOptions) => {
  const PublishDate: QuartzComponent = ({ cfg, fileData }) => {
    const showDate = opts?.showDate ?? defaultOptions.showDate
    const publishDateStr = fileData.frontmatter?.["date"]
    const altDateStr = fileData.frontmatter?.["altDate"]

    if (!showDate(fileData)) return null
    if (!publishDateStr && !altDateStr) return null

    const formatDate = (dateStr: string): string => {
      const date = new Date(dateStr)

      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        // UTC calendar day (same timezone contract as ArweaveIndex); append UTC
        // explicitly because date-only + timeZoneName yields awkward "at UTC".
        const formatted = date
          .toLocaleDateString(cfg.locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })
          .replace(/^(\w+)/, (_, month: string) => month.toUpperCase())
        return `${formatted} UTC`
      }

      // If the date is invalid, return the original string
      return dateStr
    }

    const dateToDisplay = publishDateStr ? formatDate(publishDateStr) : altDateStr

    return (
      <div className="publish-date quartz-publish-date">
        <time dateTime={publishDateStr || altDateStr}>{dateToDisplay}</time>
      </div>
    )
  }

  return PublishDate
}) satisfies QuartzComponentConstructor<PublishDateOptions>