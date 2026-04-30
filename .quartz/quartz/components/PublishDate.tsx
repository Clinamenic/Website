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
        return date
          .toLocaleDateString(cfg.locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .replace(
            /(\w+)\s(\d+),\s(\d+)/,
            (_, month, day, year) => `${month.toUpperCase()} ${day}, ${year}`,
          )
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