const { app, BrowserWindow } = require('electron');
const path = require('path');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences:{
      nodeIntegration: true
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


function passwordEntered(){
  var input = document.getElementById("Pass").value;
  updatePasswords(input);
}

function updatePasswords(input){
  document.getElementById("passwordList").innerHTML = input;
  testCreateFile();
}

//This next section is used for functions relating to the writing, reading, 
//and storing of local files on the PC
function testCreateFile(){
  alert("start of testCreateFile");
  var fs = require('fs');
  alert("middle of testCreateFile");

  fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    if (err) {
      alert("failed");
    }
    else{
      alert('Saved!');
    }
  });
  fs.appendFile();
  alert("end of testCreateFile");
}