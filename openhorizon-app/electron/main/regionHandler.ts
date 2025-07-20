// import { ipcMain, app } from 'electron';
// import fs from 'fs';
// import path from 'path';
// import https from 'https';
// import { promisify } from 'util';

// const fsUnlink = promisify(fs.unlink);
// const fsAccess = promisify(fs.access);
// const fsMkdir = promisify(fs.mkdir);
// const fsReadFile = promisify(fs.readFile);
// const fsWriteFile = promisify(fs.writeFile);
// const fsReaddir = promisify(fs.readdir);

// const REGIONS_DIR = path.join(app.getPath('userData'), 'regions');
// const MEDIA_DIR = path.join(app.getPath('userData'), 'media');

// const ensureDir = async (dir: string) => {
//   try {
//     await fsAccess(dir);
//   } catch {
//     await fsMkdir(dir, { recursive: true });
//   }
// };

// export class RegionHandler {
//   static init() {
//     this.setupHandlers();
//   }

//   private static async setupHandlers() {
//     await ensureDir(REGIONS_DIR);
//     await ensureDir(MEDIA_DIR);

//     ipcMain.handle('save-region-page', async (_, region: RegionPageData) => {
//       const filePath = path.join(REGIONS_DIR, `${region.id}.json`);
//       await fsWriteFile(filePath, JSON.stringify(region));
//     });


//     ipcMain.handle('get-region-page', async (_, regionId: string) => {
//       const filePath = path.join(REGIONS_DIR, `${regionId}.json`);
//       try {
//         const data = await fsReadFile(filePath, 'utf-8');
//         return JSON.parse(data) as RegionPageData;
//       } catch {
//         return null;
//       }
//     });


//     ipcMain.handle('download-media', async (_, { url, regionId, mediaId, type }) => {
//       const fileExt = path.extname(url) || (type === 'video' ? '.mp4' : '.webp');
//       const fileName = `${mediaId}${fileExt}`;
//       const filePath = path.join(MEDIA_DIR, fileName);
      
//       await new Promise((resolve, reject) => {
//         const file = fs.createWriteStream(filePath);
        
//         https.get(url, response => {
//           response.pipe(file);
          
//           file.on('finish', () => {
//             file.close();
//             resolve(true);
//           });
          
//           file.on('error', async (err) => {
//             file.close();
//             try {
//               await fsUnlink(filePath);
//             } catch (unlinkError) {
//               console.error('Failed to delete corrupted file:', unlinkError);
//             }
//             reject(err);
//           });
//         }).on('error', err => {
//           reject(err);
//         });
//       });

//       return {
//         id: mediaId,
//         url,
//         type,
//         regionId,
//         localPath: filePath,
//         downloadedAt: new Date().toISOString()
//       } as MediaItem;
//     });


//     ipcMain.handle('is-media-downloaded', async (_, mediaId: string) => {
//       try {
//         const files = await fsReaddir(MEDIA_DIR);
//         return files.some(file => file.startsWith(mediaId));
//       } catch {
//         return false;
//       }
//     });
//   }
// }