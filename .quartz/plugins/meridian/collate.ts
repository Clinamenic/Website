import { QuartzPlugin } from "../../quartz/plugins/types"

/**
 * Meridian Collate Integration Plugin
 * 
 * TODO: Implement plugin to read .meridian/collate.json and generate resource gallery pages
 */
export const CollatePlugin: QuartzPlugin = {
  name: "MeridianCollate",
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
    // TODO: Implement collate gallery emitter
  ],
}
