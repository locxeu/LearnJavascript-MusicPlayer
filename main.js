const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime=document.querySelector(".duration");
const remainingTime=document.querySelector(".remaining");

const listMusic = ["hh.mp3", "ncmlfu.mp3", "sfos.mp3"];
let isPlaying = true
let indexSong = 0;
playBtn.addEventListener("click", playPause);

nextBtn.addEventListener("click", function () {
    changeSong(1);
});

prevBtn.addEventListener("click", function () {
    changeSong(-1);
})


//-------------Change Song --------------//
function changeSong(direct) {
    if (direct === 1) {
       
        indexSong++;
        if (indexSong >= listMusic.length) {
            indexSong = 0;
        }
        isPlaying = true;
        console.log(indexSong);
    }
    else if (direct === -1) {
        indexSong--;
        if (indexSong < 0) {
            indexSong = listMusic.length - 1;
        }
        isPlaying = true;
    }
    song.setAttribute("src", `./music/${listMusic[indexSong]}`);
playPause();
}

//-------------Play Song---------------//
function playPause() {
    if (isPlaying) {
        song.play();
        isPlaying = false;
        playBtn.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
    } else {
        song.pause();
        isPlaying = true;
        playBtn.innerHTML = '<ion-icon name="play"></ion-icon>';
    }

}

//--------------Set Duration Time--------------//
function displayTime(){
const {duration,currentTime}=song;
remainingTime.textContent=formartTimer(currentTime);
if(!duration){
    durationTime.textContent="00:00"
}else{
    durationTime.textContent=formartTimer(duration);
}
}
displayTime();
setInterval(displayTime,1000);

function formartTimer(number){
    const minute= Math.floor(number/60);
    const seconds= Math.floor(number-minute*60);
    
    return `${minute}:${seconds<10?"0"+seconds:seconds}`;
}