
const ipc=require('electron').ipcRenderer

const button = document.getElementById("upload")

const randomString = require('random-string')

const process = require('child_process')

var format = "mp4"

const fs = require('fs')

var dir = './media'

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
}
$("#format").change(function(){
    format = $("#format option:selected").text()
    
})


button.addEventListener('click',function(event){
    ipc.send('open-file-dialog-for-file')

})

ipc.on('selected-file',function(event,paths){
    console.log(event)

    console.log(paths)

    //execution of command using ffmpeg command
    process.exec(`ffmpeg -i "${paths}" media/${randomString()}_video.${format}`)
    ,function(error,stdout,stderr){
        console.log(stdout)

        if(error !== null){
            console.log(error)
        }
    }
})