// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron')
const applescript = require('applescript');
 
// Very basic AppleScript command. Returns the song name of each
// currently selected track in iTunes as an 'Array' of 'String's.


const asyncMsgBtn = document.getElementById('async-msg')

// asyncMsgBtn.addEventListener('click', () => {
//   var script = 'tell application "Spotify" to play (next track)';
 
//   applescript.execString(script, function(err, rtn) {
//     if (err) {
//       // Something went wrong!
//       console.log(err)
  
//     }
//     if (Array.isArray(rtn)) {
//       rtn.forEach(function(songName) {
//         console.log(songName);
//       });
//     }
//   });

//  ipcRenderer.send('asynchronous-message', 'ping');
// })

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  const message = `Asynchronous message reply: ${arg}`
  document.getElementById('async-reply').innerHTML = message
})

window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  




  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(.5);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "green";
    context.fillRect(canvas.width-250, 0, 10, canvas.height);
    context.font = '18px Helvetica';
    context.fillText('NEXT', canvas.width-150, canvas.height/2);
    context.fillStyle = "red";
    context.fillRect(200, 0, 10, canvas.height);
    context.fillText('PREV', 150, canvas.height/2);
    context.fillStyle = "blue";
    context.fillRect(0, 300, canvas.width, 10);
    context.fillText('PLAY/PLAUSE', canvas.width/2, canvas.height-50);  

    // var gettrack = 'tell application "Spotify" to get {artist, name} of current track';
    // applescript.execString(gettrack, function(err, resp){
    //   context.fillStyle = "yellow";
    //   context.font = '18px Helvetica';
    //   context.fillText("some text", canvas.width/2-30, 50);
    //   console.log(resp[0] + ' - ' + resp[1]);
    
    // });
    
    var faces = event.data.filter(rect => rect.width > 180 );
    
    var changed = false; 
    
    faces.forEach(drawBorder);
  
    function drawBorder(rect){
      context.strokeStyle = '#a64ceb';
      context.strokeRect(canvas.width-rect.x-rect.width, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      setTimeout(changeTrack(rect),7000)
      console.dir(changed);
      //changeTrack(rect);
    }
   
    function changeTrack(rect){
      if (changed == false) {
        if (rect.x < 50) {
      
          var script = 'tell application "Spotify" to play (next track)';
          applescript.execString(script);
          changed = true;
        }
        else if (rect.x > 500) {
            var script2 = 'tell application "Spotify" to play (previous track)';
            applescript.execString(script2);
            changed = true;
          }
        }
      else {
        changed = false;
      }

    }
    // event.data.forEach(function(rect) {

      
      
    //   context.strokeStyle = '#a64ceb';
    //   context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    //   context.font = '11px Helvetica';
    //   context.fillStyle = "#fff";
    //   context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    //   context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      
      
    //   if (rect.y > 250 && rect.width > 200) {
    //     var script1 = 'tell application "Spotify" to playpause';
    //     applescript.execString(script1);
    //     //alert("play/pause")
    //   }

    //   else if (rect.x > 500 && rect.width > 200) {
    //     var script2 = 'tell application "Spotify" to play (previous track)';
    //     applescript.execString(script2);
    //     //alert("prev")
    //   }
    //   else if (rect.x < 50 && rect.width > 200) {
    //     // alert("bingo");
    //     var script = 'tell application "Spotify" to play (next track)';
    //     applescript.execString(script);
    //   }
    // });
  });


};
