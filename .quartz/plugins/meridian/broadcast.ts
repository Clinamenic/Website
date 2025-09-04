import { QuartzPlugin } from "../../quartz/plugins/types"

/**
 * Meridian Broadcast Integration Plugin
 * 
 * TODO: Implement plugin to enhance social metadata from broadcast configurations
 */
export const BroadcastPlugin: QuartzPlugin = {
  name: "MeridianBroadcast",
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
    // TODO: Implement broadcast metadata emitter
  ],
}
