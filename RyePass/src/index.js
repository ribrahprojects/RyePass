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
  var website = document.getElementById("website").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  updatePasswords(website, username, password);
}

function updatePasswords(website, username, password){
  //document.getElementById("passwordList").innerHTML = input;
  testCreateFile(website, username, password);
}

//This next section is used for functions relating to the writing, reading, 
//and storing of local files on the PC
function testCreateFile(website, username, password){
  //alert("start of testCreateFile");
  var fs = require('fs');

  var entry = {
    new_website: website,
    new_username: username,
    new_password: password
  }

  var data = JSON.stringify(entry);
  //alert("middle of testCreateFile");

  fs.writeFile('./passwords/mynewfile1.json', data, function (err) {
    if (err) {
      alert("failed");
    }
    else{
      alert('Saved!');
    }
  });
  document.getElementById('passwordlist').innerHTML += ('<li>'+data+'</li>');
  //alert("end of testCreateFile");

  var JSONdb = require('simple-json-db');
  var db = new JSONdb('./passwords/passwords.json');
  db.set('1', entry);

}

