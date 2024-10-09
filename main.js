const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let win;
let server;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.loadURL('http://localhost:3001');

  win.on('closed', () => {
    win = null;
    if (server) server.kill();
  });
}

// app.on('ready', () => {
//   const nodeBinaryPath = path.join(__dirname, 'node.exe'); 
//   server = spawn(nodeBinaryPath, [path.join(__dirname, 'server1.js')]);
//   server.stdout.on('data', (data) => {
//     console.log(`server: ${data}`);
//     if (!win) createWindow();
//   });
// });


app.on('ready', () => {
  server = spawn('node', [path.join(__dirname, 'server1.js')]);
  server.stdout.on('data', (data) => {
    console.log(`server: ${data}`);
    if (!win) createWindow();
  });
});



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
