import { QuartzPlugin } from "../../quartz/plugins/types"

/**
 * Meridian Archive Integration Plugin
 * 
 * TODO: Implement plugin to read .meridian/archive.json and generate archive showcase pages
 */
export const ArchivePlugin: QuartzPlugin = {
  name: "MeridianArchive",
  markdownPlugins() {
    return []
  },
  htmlPlugins() {
    return []
  },
  externalResources() {
    return {}
  },
  emitters: [
    // TODO: Implement archive showcase emitter
  ],
}
