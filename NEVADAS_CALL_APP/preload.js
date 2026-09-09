const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('nevadasDesktop', {
  isApp: true,
  listSources: () => ipcRenderer.invoke('nevadas:list-sources'),
  openPicker: (mode) => ipcRenderer.invoke('nevadas:open-picker', mode),
  selectSource: (sourceId) => ipcRenderer.invoke('nevadas:select-source', sourceId),
  cancelPicker: () => ipcRenderer.invoke('nevadas:cancel-picker'),
  onPickerRefresh: (callback) => ipcRenderer.on('picker-refresh', (_event, mode) => callback(mode))
});
