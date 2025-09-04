/**
 * Meridian Plugin Exports
 * 
 * This file exports all Meridian-specific plugins for Quartz
 */

// Types
export * from './types'

// Plugins (TODO: Implement these)
// export { CollatePlugin } from './collate'
// export { ArchivePlugin } from './archive'
// export { BroadcastPlugin } from './broadcast'

// Placeholder exports to prevent build errors
export const CollatePlugin = () => ({ name: "MeridianCollate" });
export const ArchivePlugin = () => ({ name: "MeridianArchive" });
export const BroadcastPlugin = () => ({ name: "MeridianBroadcast" });
