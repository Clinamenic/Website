# Frontmatter Restructuring Proposal

## Current State

Currently, Quartz component visibility is controlled by individual frontmatter properties:

```yaml
---
quartzShowBacklinks: true
quartzShowCitation: true
quartzShowExplorer: true
quartzShowFlex: true
quartzShowGraph: true
quartzSearch: true
quartzShowSubtitle: true
quartzShowTitle: true
quartzShowTOC: true
---
```

## Proposed Change

Restructure the frontmatter to use a single nested `quartzConfig` property that contains all component visibility settings:

```yaml
---
quartzConfig:
  showBacklinks: true
  showCitation: true
  showExplorer: true
  showFlex: true
  showGraph: true
  search: true
  showSubtitle: true
  showTitle: true
  showTOC: true
---
```

## Implementation Details

### 1. Frontmatter Schema Update

Update the frontmatter type definition to include the new structure:

```typescript
interface QuartzConfig {
  showBacklinks?: boolean
  showCitation?: boolean
  showExplorer?: boolean
  showFlex?: boolean
  showGraph?: boolean
  search?: boolean
  showSubtitle?: boolean
  showTitle?: boolean
  showTOC?: boolean
}

interface FrontmatterData {
  // ... existing properties ...
  quartzConfig?: QuartzConfig
}
```

### 2. Component Updates

Update each component to check for its visibility setting within the `quartzConfig` object:

```typescript
function Backlinks(props: QuartzComponentProps) {
  const showBacklinks = props.fileData.frontmatter.quartzConfig?.showBacklinks ?? true
  if (!showBacklinks) return null

  // ... existing component logic ...
}
```

### 3. Migration Strategy

1. **Backward Compatibility**:

   - Maintain support for individual properties during a transition period
   - Log deprecation warnings when individual properties are used
   - Provide a migration script to update existing content

2. **Migration Script**:

```typescript
async function migrateFrontmatter(file: string) {
  const content = await fs.readFile(file, "utf-8")
  const { data, content: markdown } = matter(content)

  const quartzConfig = {
    showBacklinks: data.quartzShowBacklinks,
    showCitation: data.quartzShowCitation,
    showExplorer: data.quartzShowExplorer,
    showFlex: data.quartzShowFlex,
    showGraph: data.quartzShowGraph,
    search: data.quartzSearch,
    showSubtitle: data.quartzShowSubtitle,
    showTitle: data.quartzShowTitle,
    showTOC: data.quartzShowTOC,
  }

  // Remove individual properties
  const newData = { ...data }
  Object.keys(quartzConfig).forEach((key) => {
    delete newData[`quartz${key.charAt(0).toUpperCase() + key.slice(1)}`]
  })

  // Add quartzConfig
  newData.quartzConfig = quartzConfig

  return matter.stringify(markdown, newData)
}
```

### 4. Documentation Updates

1. Update template files to use the new structure
2. Update documentation to reflect the new frontmatter format
3. Add migration guide for users

## Benefits

1. **Cleaner Frontmatter**: Reduces property sprawl in frontmatter
2. **Better Organization**: Groups related settings together
3. **Easier Maintenance**: Single location for Quartz-specific settings
4. **Future Extensibility**: Easier to add new component settings

## Considerations

1. **Migration Effort**: Need to update existing content
2. **Backward Compatibility**: Maintain support for old format during transition
3. **Default Values**: Ensure sensible defaults when `quartzConfig` is not specified

## Timeline

1. **Phase 1**: Implement new structure with backward compatibility
2. **Phase 2**: Create and distribute migration script
3. **Phase 3**: Update documentation and templates
4. **Phase 4**: Remove support for individual properties (after sufficient transition period)
