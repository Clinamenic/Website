/**
 * Meridian Plugin Types
 * 
 * Shared types for Meridian-specific Quartz plugins
 */

export interface MeridianCollateData {
  resources: Array<{
    title: string;
    url: string;
    domain: string;
    description?: string;
    tags?: string[];
    selected: boolean;
  }>;
}

export interface MeridianArchiveData {
  uploads: Array<{
    filename: string;
    txId: string;
    size: number;
    timestamp: string;
    status: 'confirmed' | 'pending' | 'failed';
  }>;
}

export interface MeridianBroadcastData {
  platforms: {
    atproto?: {
      handle: string;
      displayName: string;
    };
    x?: {
      username: string;
      displayName: string;
    };
  };
  metadata: {
    title?: string;
    description?: string;
    tags?: string[];
  };
}
