const { app, globalShortcut, BrowserWindow } = require('electron');

app.commandLine.appendSwitch("ignore-certificate-errors");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 900,
    height: 650,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  //mainWindow.webContents.openDevTools();
  mainWindow.on("close", () => {
    mainWindow.webContents.send("stop-server");
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.whenReady().then(() => {
  globalShortcut.register("Alt+CommandOrControl+L", () => {
    mainWindow.webContents.send("show-server-log");
  })
}).then(createWindow);
