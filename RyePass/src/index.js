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
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function passwordEntered(){
  var name = document.getElementById("name").value;
  var website = document.getElementById("website").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  updatePasswords(website, username, password, name);
}

function updatePasswords(website, username, password, name){
  //document.getElementById("passwordList").innerHTML = input;
  var JSONdb = require('simple-json-db');
  var db = new JSONdb('./passwords/passwords.json');
  if (db.has(name)){
    alert("this name already exists, try another");
  }
  else {
    testCreateFile(website, username, password, name);
  }
}

//This next section is used for functions relating to the writing, reading, 
//and storing of local files on the PC
function testCreateFile(website, username, password, name){
  document.getElementById('passwordlist').innerHTML = ('');
  document.getElementById('passwordJSON').innerHTML = ('');


  var JSONdb = require('simple-json-db');
  var db = new JSONdb('./passwords/passwords.json');

  var entry = {
    new_website: website,
    new_username: username,
    new_password: password
  }

  var set = name;
  db.set(set, entry);

  //var currentEntry = JSON.stringify(db.get(0));
  //document.getElementById('passwordlist').innerHTML += ('<li>'+currentEntry+'</li>');

  var i = 0;
  var stop = false;
  while (stop == false){
    if (db.has(i)){
      var currentEntry = JSON.stringify(db.get(i));
      document.getElementById('passwordlist').innerHTML += ('<li>'+currentEntry+'</li>');
      i++;
    }
    else{stop = true;}
  }
  //alert(JSON.stringify(db.JSON()));
  document.getElementById('passwordJSON').innerHTML += (JSON.stringify(db.JSON()));

}

function generatePassword(){

  document.getElementById('newPassword').innerHTML = '';

  var length = document.getElementById("length").value;
  var upper = document.getElementById("upper").checked;
  var lower = document.getElementById("lower").checked;
  var numbers = document.getElementById("number").checked;
  var symbols = document.getElementById("symbol").checked;
  var newPass = '';
  var result = []

  var characters = '';
  var characterlength = 0;
  if (upper == true){characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; characterlength += 26;}
  if (lower == true){characters += 'abcdefghijklmnopqrstuvwxyz'; characterlength += 26;}
  if (numbers == true){characters += '1234567890'; characterlength += 10;}
  if (symbols == true){characters += '!@#$%^&*()/.,'; characterlength += 14;}

  for(var i = 0 ; i<length ; i++){
    result.push(characters.charAt(Math.floor(Math.random() * characterlength)));
   }
  newPass = result.join('');
  document.getElementById('newPassword').innerHTML += newPass;
}

function deleteAllPasswords(){
  var JSONdb = require('simple-json-db');
  var db = new JSONdb('./passwords/passwords.json');
  db.deleteAll();
}

function updatePasswordDisplay(){
  
}
