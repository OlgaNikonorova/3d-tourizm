const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveRegion: (regionId, data) => ipcRenderer.invoke('save-region', { regionId, data }),
  fetchRegion: (regionId) => ipcRenderer.invoke('fetch-region', regionId),
  removeRegion: (regionId) => ipcRenderer.invoke('remove-region', regionId),
  checkRegionExists: (regionId) => ipcRenderer.invoke('check-region-exists', regionId),
});