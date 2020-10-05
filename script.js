const audio = document.querySelector('audio');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const artist = document.getElementById('artist');
const img = document.querySelector('img');
const songName = document.getElementById('songName');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
let currentTimeElement = document.getElementById('current-time');
let durationElement = document.getElementById('duration');

let isPlaying = false;
let index = 0;

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

function playAudio() {
  isPlaying = true;
  playButton.classList.replace('fa-play', 'fa-pause');
  audio.play();
  playButton.setAttribute('title', 'pause');
}
function pauseAudio() {
  isPlaying = false;
  playButton.classList.replace('fa-pause', 'fa-play');
  audio.pause();
  playButton.setAttribute('title', 'play');
}


function loadAudio(song) {
  songName.textContent = song.displayName;
  img.src = `img/${song.name}.jpg`;
  audio.src = `music/${song.name}.mp3`;
  artist.textContent = song.artist;
}


function prevSong() {
  index--;
  if (index < 0) {
    index = songs.length - 1;
  }
  loadAudio(songs[index]);
  playAudio();
}
function nextSong() {
  index++;
  if (index > songs.length - 1) {
    index = 0;
  }
  loadAudio(songs[index]);
  playAudio();
}


function updateProgressWidth(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    //To display the black progress line 
    let progressWidth = (currentTime / duration )* 100;
    progress.style.width = `${progressWidth}%`;
    //To calculate the duration of song
    const audioMinutes = Math.floor(duration / 60);
    const audioSeconds = Math.floor(duration % 60);
    // to prevent NaN while switching, ie.delaying untill both is calculated
    if (audioMinutes && audioSeconds) {
      if (audioSeconds < 10)
        durationElement.textContent = `${audioMinutes}:0${audioSeconds}`;
      else
        durationElement.textContent = `${audioMinutes}:${audioSeconds}`;
    }
    //To calculate the current time of the song
    const currentAudioMinutes = Math.floor(currentTime / 60);
    const currentAudioSeconds = Math.floor(currentTime % 60);
      if (currentAudioSeconds < 10)
        currentTimeElement.textContent = `${currentAudioMinutes}:0${currentAudioSeconds}`;
      else
        currentTimeElement.textContent = `${currentAudioMinutes}:${currentAudioSeconds}`;
  }
}


function setProgress(event){
  // To get the total duration of the audio
  const {duration}=audio;
  // this is used to find the properties of the parent that has caused the event trigger
const width=this.clientWidth;
//to find the distance from beginning of the parent elemet that caused the event to the mouse click distance
const clickX=event.offsetX;
console.log('clickx',clickX);
console.log("percent of song completed",clickX/width*duration);
audio.currentTime=( clickX / width) *duration;
}

//On load
loadAudio(songs[index]);

//Event listeners
playButton.addEventListener('click', () => (isPlaying ? pauseAudio() : playAudio()));
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgressWidth);
progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended',nextSong);
