# Folgezettel Naming System Research & Recommendations

## Executive Summary

This document presents research findings on folgezettel naming systems for zettelkasten methodology and provides specific recommendations for flexible naming schemes that can accommodate notes referencing multiple texts, single texts, or no texts at all. The research reveals significant limitations in traditional branching systems and identifies several promising alternatives that offer greater flexibility for modern digital zettelkasten implementations.

## Current System Analysis

Your current system uses the format: `r-AuthorInitials-TitleInitials-Number` (e.g., `r-JK-GT-1.md`, `r-JK-GT-2.md`)

### Strengths:

- Clear reference to source material
- Sequential numbering within each source
- Immediately recognizable as reference notes

### Limitations:

- Cannot accommodate notes referencing multiple texts
- Difficult to handle notes with no text references
- Forces artificial choice of "primary" text when multiple sources are relevant
- Becomes unwieldy when representing complex relationships between ideas

## Research Findings

### 1. Traditional Folgezettel Systems

**Luhmann's Original System:**

- Used branching alphanumeric IDs (e.g., `1/1a`, `1/2`, `1/2a1`)
- Designed for physical card systems
- Created hierarchical relationships between notes
- Allowed for unlimited branching but became complex

**Key Problems Identified:**

- **Binary Tree Problem**: Each note can only branch to limited directions
- **Proximity Problem**: Related notes get separated by extensive branching
- **Complexity Explosion**: IDs become unwieldy (e.g., `112.5d5a3b.1c2a`)
- **Decision Paralysis**: Difficult to choose between child vs. sibling relationships

### 2. Modern Digital Alternatives

**Timestamp-Based Systems:**

- Format: `YYYYMMDDHHMMSS` or `YYYYMMDDHHMM`
- Pros: Unique, chronological, simple
- Cons: No semantic meaning, difficult to group related notes

**Semantic Hybrid Systems:**

- Combine meaningful prefixes with flexible numbering
- Example: `ConceptName-YYYYMMDD-NN`
- Allows for semantic grouping while maintaining uniqueness

**Tag-Based Systems:**

- Rely on metadata tags rather than filename structure
- Use simple sequential IDs with rich tagging
- Example: `001.md` with tags: `#keynes #economics #employment`

### 3. Flexible Naming Schemes for Multi-Reference Notes

**Theme-Based Numbering:**

- Format: `theme-subtopic-number` (e.g., `economics-employment-001`)
- Accommodates multiple sources under thematic umbrellas
- Allows for cross-cutting concepts

**Hybrid Source-Theme System:**

- Primary reference: `r-JK-GT-1` (traditional)
- Multi-reference: `x-employment-theory-001` (cross-cutting)
- No reference: `n-methodology-001` (original thoughts)

**Contextual Prefixes:**

- `r-` for single reference notes
- `x-` for cross-reference notes (multiple sources)
- `n-` for original notes (no specific source)
- `s-` for synthesis notes (combining multiple ideas)

## Recommended Naming Schemes

### Option 1: Expanded Prefix System

**Structure:** `[prefix]-[descriptor]-[number]`

**Prefixes:**

- `r-` Reference to single text (your current system)
- `x-` Cross-reference (multiple texts)
- `n-` Original note (no specific text reference)
- `s-` Synthesis note (combining ideas from multiple sources)
- `m-` Methodology note (about processes, methods)
- `q-` Question note (open questions, inquiries)

**Examples:**

- `r-JK-GT-1.md` (single reference, current system)
- `x-employment-theory-001.md` (references multiple texts on employment)
- `n-research-methodology-001.md` (original thoughts on methodology)
- `s-keynes-hayek-debate-001.md` (synthesis of competing theories)

### Option 2: Contextual Numbering System

**Structure:** `[context]-[topic]-[sequence]`

**Contexts:**

- `lit-` Literature-based (any text reference)
- `syn-` Synthesis (combining multiple sources)
- `orig-` Original thoughts
- `meth-` Methodological notes
- `conn-` Connection notes (linking ideas)

**Examples:**

- `lit-employment-theory-001.md`
- `syn-classical-keynesian-001.md`
- `orig-zettelkasten-workflow-001.md`
- `conn-economics-philosophy-001.md`

### Option 3: Semantic Clustering System

**Structure:** `[cluster]-[branch]-[leaf]`

**Benefits:**

- Natural grouping of related concepts
- Flexible enough for various reference patterns
- Allows for organic growth of idea clusters

**Examples:**

- `economics-employment-keynes-001.md`
- `economics-employment-classical-001.md`
- `economics-employment-synthesis-001.md`
- `methodology-zettelkasten-folgezettel-001.md`

### Option 4: Buffer-Based Numbering (Recommended)

**Structure:** Uses spaced numerical system with semantic prefixes

**Format:** `[prefix][topic].[number]`

**Examples:**

- `r-keynes.1010` (reference note, room for insertion)
- `x-employment.2050` (cross-reference, buffer space)
- `n-methodology.1500` (original note)
- `s-debate.3000` (synthesis note)

**Benefits:**

- Easy to insert related notes between existing ones
- Maintains semantic meaning
- Flexible for different reference patterns
- Scalable system

## Implementation Recommendations

### Phase 1: Gradual Migration

1. Continue using existing system for single-text references
2. Introduce new prefixes for multi-reference and original notes
3. Test the system with 10-20 notes before full adoption

### Phase 2: Full Integration

1. Establish consistent naming conventions for each prefix type
2. Create templates for different note types
3. Develop index system to track cross-references

### Phase 3: Optimization

1. Analyze usage patterns after 3-6 months
2. Refine system based on actual workflow needs
3. Consider automation tools for note creation

## Metadata Enhancement

### Frontmatter Standards

```yaml
---
type: [reference|cross-reference|original|synthesis]
sources:
  - "[[The General Theory of Employment, Interest and Money]]"
  - "[[Classical Economic Theory]]"
topics: [employment, economics, theory]
related: [list of related note IDs]
confidence: [high|medium|low]
---
```

### Linking Strategies

- Use consistent linking patterns between related notes
- Create hub notes for major topics
- Implement bidirectional linking for cross-references
- Maintain an index of multi-reference notes

## Conclusion

The recommended approach is **Option 4: Buffer-Based Numbering** with semantic prefixes, as it provides:

1. **Flexibility**: Handles single, multiple, and no text references
2. **Scalability**: Easy to insert related notes
3. **Semantic Clarity**: Immediate understanding of note type
4. **Backward Compatibility**: Can coexist with your current system

This system acknowledges that modern zettelkasten practice involves complex relationships between ideas that don't fit neatly into traditional hierarchical structures. By using semantic prefixes and buffer-based numbering, you can maintain the benefits of folgezettel organization while accommodating the full spectrum of note types in your zettelgarten.

## Next Steps

1. Review the proposed schemes and select one that resonates with your workflow
2. Create a small test implementation with 10-15 notes
3. Establish templates for each note type
4. Develop a migration plan for existing notes if desired
5. Document your chosen system for consistency

---

_This research synthesizes multiple sources from the zettelkasten community, academic literature on knowledge management, and practical implementations by digital gardeners and personal knowledge management practitioners._
