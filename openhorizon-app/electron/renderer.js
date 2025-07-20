// const { ipcRenderer } = require("electron");
// const { FETCH_DATA_FROM_STORAGE, SAVE_DATA_IN_STORAGE, REMOVE_DATA_FROM_STORAGE} = require("../utils/constants")

// // Ask main to load data from its persistent storage
// function loadSavedData() {
//   console.log("Renderer sending: FETCH_DATA_FROM_STORAGE")
//   ipcRenderer.send(FETCH_DATA_FROM_STORAGE, "itemsToTrack")
// }

// // Send item message to main
// function saveDataInStorage(item) {
//   console.log("Renderer sending: SAVE_DATA_IN_STORAGE")
//   ipcRenderer.send(SAVE_DATA_IN_STORAGE, item)
// }

// // Remove an item
// function removeDataFromStorage(item) {
//   console.log("Renderer sending: REMOVE_DATA_FROM_STORAGE")
//   ipcRenderer.send(REMOVE_DATA_FROM_STORAGE, item)
// }

// module.exports = { loadSavedData, saveDataInStorage, removeDataFromStorage }