const { app, BrowserWindow, BrowserView, desktopCapturer, ipcMain, session } = require('electron');
const path = require('path');

let mainWindow = null;
let pickerWindow = null;
let selectedSourceId = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    backgroundColor: '#080808',
    title: 'NEVADAS CALL',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

async function listDesktopSources() {
  const sources = await desktopCapturer.getSources({
    types: ['window', 'screen'],
    thumbnailSize: { width: 420, height: 236 },
    fetchWindowIcons: true
  });

  return sources.map(source => ({
    id: source.id,
    name: source.name,
    display_id: source.display_id || '',
    thumbnail: source.thumbnail ? source.thumbnail.toDataURL() : '',
    appIcon: source.appIcon ? source.appIcon.toDataURL() : ''
  }));
}

async function openPicker(mode = 'all') {
  if (pickerWindow && !pickerWindow.isDestroyed()) {
    pickerWindow.focus();
    pickerWindow.webContents.send('picker-refresh', mode);
    return;
  }

  pickerWindow = new BrowserWindow({
    width: 980,
    height: 720,
    minWidth: 760,
    minHeight: 560,
    parent: mainWindow,
    modal: true,
    show: false,
    title: 'Compartilhar no NEVADAS',
    backgroundColor: '#080808',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  pickerWindow.removeMenu();
  await pickerWindow.loadFile(path.join(__dirname, 'picker.html'), { query: { mode } });
  pickerWindow.once('ready-to-show', () => pickerWindow.show());
  pickerWindow.on('closed', () => { pickerWindow = null; });
}

app.whenReady().then(() => {
  // Disable the operating-system picker: NEVADAS supplies its own picker UI.
  session.defaultSession.setDisplayMediaRequestHandler(async (request, callback) => {
    try {
      if (!selectedSourceId) {
        callback({});
        return;
      }

      const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
      const source = sources.find(s => s.id === selectedSourceId);
      const sourceId = selectedSourceId;
      selectedSourceId = null;

      if (!source) {
        callback({});
        return;
      }

      // Windows: loopback carries desktop audio. The renderer requests restrictOwnAudio
      // so the NEVADAS app itself is excluded from the captured audio when supported.
      callback({
        video: source,
        audio: request.audioRequested ? 'loopback' : undefined
      });
    } catch (err) {
      console.error('display media handler:', err);
      callback({});
    }
  }, { useSystemPicker: false });

  ipcMain.handle('nevadas:list-sources', async () => listDesktopSources());

  ipcMain.handle('nevadas:open-picker', async (_event, mode) => {
    await openPicker(mode || 'all');
    return true;
  });

  ipcMain.handle('nevadas:select-source', async (_event, sourceId) => {
    selectedSourceId = sourceId;
    if (pickerWindow && !pickerWindow.isDestroyed()) pickerWindow.close();
    return true;
  });

  ipcMain.handle('nevadas:cancel-picker', async () => {
    selectedSourceId = null;
    if (pickerWindow && !pickerWindow.isDestroyed()) pickerWindow.close();
    return true;
  });

  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
