// import { app } from 'electron';
// import fs from 'fs';
// import path from 'path';

// const STORAGE_PATH = path.join(app.getPath('userData'), 'storage.json');

// export function saveData(data: any) {
//   fs.writeFileSync(STORAGE_PATH, JSON.stringify(data));
// }

// export function loadData() {
//   if (!fs.existsSync(STORAGE_PATH)) return [];
  
//   try {
//     const data = fs.readFileSync(STORAGE_PATH, 'utf-8');
//     return JSON.parse(data);
//   } catch {
//     return [];
//   }
// }