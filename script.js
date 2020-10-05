const audio=document.querySelector('audio');
const prevButton=document.getElementById('prev');
const playButton=document.getElementById('play');
const nextButton=document.getElementById('next');
const artist=document.getElementById('artist');
const img=document.querySelector('img');
const songName=document.getElementById('songName');

let isPlaying=false;
let index=0;

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

function playAudio(){
    isPlaying=true;
    playButton.classList.replace('fa-play','fa-pause');
    audio.play();
    playButton.setAttribute('title','pause');
}
function pauseAudio(){
    isPlaying=false;
    playButton.classList.replace('fa-pause','fa-play');
    audio.pause();
    playButton.setAttribute('title','play');
}

function audioLoad(song){
    songName.textContent=song.displayName;
    img.src=`img/${song.name}.jpg`;
    audio.src=`music/${song.name}.mp3`;
    artist.textContent=song.artist;
}

function prevSong(){
    index--;
    if(index<0){
        index=songs.length-1;
    }
    audioLoad(songs[index]);
    playAudio();
}
function nextSong(){
    index++;
    if(index>songs.length-1){
        index=0;
    }
    audioLoad(songs[index]);
    playAudio();
}
  
audioLoad(songs[index]);
playButton.addEventListener('click', () =>( isPlaying ? pauseAudio() : playAudio() ));
prevButton.addEventListener('click',prevSong);
nextButton.addEventListener('click',nextSong);
