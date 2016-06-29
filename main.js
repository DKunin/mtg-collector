const electron = require('electron');
// const server = require('./modules/server');
// const yaml = require('js-yaml');
// const fs = require('fs');
// const path = require('path');

// const appDir = path.dirname(require.main.filename);

// const CONFIG = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname + '/config.yml'), 'utf8'));
// const CollectionStoreClass = require('./modules/store');
// const collectionStore = new CollectionStoreClass(appDir + '/' + CONFIG.server.db);
// const usersStore = new CollectionStoreClass(appDir + '/' + CONFIG.server.usersdb);

// server.start(collectionStore, usersStore);

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    // mainWindow.loadURL(`http://localhost:${server.port()}`);

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
