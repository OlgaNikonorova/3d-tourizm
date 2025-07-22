// export const IPC = {
//   VIDEO: {
//     DOWNLOAD: 'video:download',
//     DOWNLOAD_AND_SAVE: 'video:download-and-save',
//     GET_DOWNLOADED: 'video:get-downloaded',
//     CANCEL: 'video:cancel',
//     PROGRESS: 'video:progress'
//   },
//   STORAGE: {
//     SAVE: 'storage:save',
//     GET: 'storage:get',
//     DELETE: 'storage:delete',
//     UPDATE: 'storage:update'
//   }
// } as const;

// export type IPCMainChannels = keyof typeof IPC;
// export type IPCRendererChannels = `${typeof IPC[keyof typeof IPC]}`;