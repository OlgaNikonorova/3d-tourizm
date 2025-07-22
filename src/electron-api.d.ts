declare interface Window {
  electronAPI?: {
    saveRegion: (regionId: string, data: unknown) => Promise<{success: boolean}>;
    fetchRegion: (regionId: string) => Promise<{success: boolean; data?: unknown}>;
    removeRegion: (regionId: string) => Promise<{success: boolean}>;
    checkRegionExists: (regionId: string) => Promise<boolean>;
  };
}