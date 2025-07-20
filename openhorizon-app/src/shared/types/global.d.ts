declare global {
  interface Window {
    electronApi?: {
      downloadRegion: (
        regionId: string, 
        resources: Array<{ url: string; fileName: string }>
      ) => Promise<boolean>;
      
      isRegionDownloaded: (regionId: string) => Promise<boolean>;
      
      saveRegionData: (regionId: string, data: string) => Promise<void>;
      
      getLocalRegion: (regionId: string) => Promise<any>;
    };
  }
}