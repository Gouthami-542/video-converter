

var ipc = require('electron').ipcMain

const path = require('path')

const os=require('os')

var {dialog} = require('electron')

const { app, BrowserWindow } = require('electron')

var mainWindow = null;

app.on('ready',function(){
    mainWindow = new BrowserWindow({
        resizable: true,
        height : 600,
        width : 800,
        webPreferences : {
            nodeIntegration : true
        }
    })

    mainWindow.loadURL("file://" + __dirname + '/index.html')

    mainWindow.on('closed',function(){
        mainWindow = null;
    })
})

ipc.on('open-file-dialog-for-file', function(event){
    console.log("button pressed")

    if(os.platform( ) === 'macOS'  || os.platform() === 'macOS'){
        dialog.showOpenDialog(null,{
            properties:['openFile','openDirectory']
        }).then((result) => {
            console.log(result.filePaths)
            event.sender.send("selected-file",result.filePaths[0])
        }).catch((err) => {
            console.log(err)

        })
    }else{
        dialog.showOpenDialog(null,{
            properties:['openFile']
         }).then((result) => {
            console.log(result.filePaths)
            event.sender.send("selected-file",result.filePaths[0])
        }).catch((err) => {
        console.log(err)
        })
    }

})
      