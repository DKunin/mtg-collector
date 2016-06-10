const electron = require('electron');
const server = require('./server');
server.start();
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(`http://localhost:${server.port()}`);
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
