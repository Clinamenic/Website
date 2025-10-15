export interface CitationFields {
  // Core metadata
  title: string
  subtitle?: string
  author: string | string[]
  date: string
  type?: 'article' | 'book' | 'chapter' | 'conference' | 'thesis' | 'webpage'
  
  // Publication details
  journal?: string
  volume?: string
  issue?: string
  pages?: string
  publisher?: string
  publisherLocation?: string
  edition?: string
  website?: string
  
  // Identifiers
  doi?: string
  url?: string
  
  // Additional fields
  degree?: string
  language?: string
  abstract?: string
  keywords?: string[]
} 