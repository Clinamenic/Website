import { QuartzComponentConstructor, QuartzComponent } from "./types"
import "./styles/publishdate.scss"

const PublishDate: QuartzComponent = ({ cfg, fileData }) => {
  const publishDateStr = fileData.frontmatter?.["date"]
  const altDateStr = fileData.frontmatter?.["altDate"]

  if (!publishDateStr && !altDateStr) return null

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    
    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString(cfg.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).replace(/(\w+)\s(\d+),\s(\d+)/, (_, month, day, year) => 
        `${month.toUpperCase()} ${day}, ${year}`
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

export default (() => PublishDate) satisfies QuartzComponentConstructor