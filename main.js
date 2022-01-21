const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeProgress = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicImage = document.querySelector(".music-thumb img");
const reapeatBtn= document.querySelector(".play-repeat");
const playRandom=document.querySelector(".play-random");
const listMusic = [
    {
        id: 1,
        title: "Đường Chân Trời",
        file: "duongchantroi.mp3",
        image:
            "img/duongchantroi.jpg",
    },
    {
        id: 2,
        title: "Và Thế Là Hết",
        file: "vathelahet.mp3",
        image:
            "img/nhungconduongsongsong.jpg",
    },
    {
        id: 3,
        title: "Những Con Đường Song Song",
        file: "duongsongsong.mp3",
        image:
            "img/vathelahet.jpg",
    },
    {
        id: 4,
        title: "Có Em Đời Bỗng Vui",
        file: "coemdoibongvui.mp3",
        image:
            "img/coemdoibongvui.jpg",
    },
    {
        id: 5,
        title: "Nếu Ngày Mai Không Đến",
        file: "neungaymaikhongden.mp3",
        image:
            "img/neungaymaikhongden.jpg",
    },
];
let isPlaying = true
let indexSong = 0;
let isRepeat=false;
let isRandom=false;
playBtn.addEventListener("click", playPause);

//---------------To the next song----------//
nextBtn.addEventListener("click", function () {
    changeSong(1);
});
//---------------To the previous song----------//

prevBtn.addEventListener("click", function () {
    changeSong(-1);
})


//-------------Change Song --------------//
function changeSong(direct) {
    if (direct === 1) {
        if(isRandom){
             radomSong =Math.floor(Math.random()*listMusic.length);
            console.log(radomSong+'radomSong');
            console.log(indexSong+'indexSong');
            if(indexSong!=radomSong){
                indexSong=radomSong;
            }
            isPlaying=true;
        }else{
            indexSong++;
            if (indexSong >= listMusic.length) {
                indexSong = 0;
            }
            isPlaying = true;
        }
        // console.log(indexSong);
    }
    else if (direct === -1) {
        indexSong--;
        if (indexSong < 0) {
            indexSong = listMusic.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    playPause();
}
//-----------------Reapeat Song-------------------//
reapeatBtn.addEventListener("click",function(){
    if(isRepeat){
        isRepeat=false;
        reapeatBtn.removeAttribute("style");
    }else{
        isRepeat=true;
        reapeatBtn.style.color = "#ffb86c";
    }
});
//----------------Random Song-------------------//
playRandom.addEventListener("click",function(){
    if(isRandom){
        isRandom=false;
        playRandom.removeAttribute("style");
    }else{
        isRandom=true;
        playRandom.style.color = "green";
    }
});

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
function displayTime() {
    const { duration, currentTime } = song;
    rangeProgress.max = duration;
    rangeProgress.value = currentTime;
    // if(rangeProgress.value=duration){
    //     changeSong(1);
    //     currentTime=0;
    // }
    remainingTime.textContent = formartTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00"
    } else {
        durationTime.textContent = formartTimer(duration);
    }
}
setInterval(displayTime, 1000);


//--------------Convert seconds => minute+seconds---------------//
function formartTimer(number) {
    const minute = Math.floor(number / 60);
    const seconds = Math.floor(number - minute * 60);

    return `${minute}:${seconds < 10 ? "0" + seconds : seconds}`;
}
//---------------------pull progress bar---------------------//
rangeProgress.addEventListener("change", pullProgressBar);

function pullProgressBar() {
    song.currentTime = rangeProgress.value;
}
//---------------end song and next -------------------------//
song.addEventListener("ended", endandNextSong);

function endandNextSong() {
    if(isRepeat){
   isPlaying=true;
   playPause();
    }else{
        changeSong(1);
    }
   
}
//-----------------inint state when load song-----------------------------//
function init(indexSong) {
    displayTime();
    song.setAttribute("src", `./music/${listMusic[indexSong].file}`);
   musicName.textContent=listMusic[indexSong].title;
   musicImage.setAttribute("src",listMusic[indexSong].image);
}
init(indexSong);