const songs = [
  { name: "Song 1", file: "songs/song1.mp3" },
  { name: "Song 2", file: "songs/song2.mp3" },
  { name: "Song 3", file: "songs/song3.mp3" },
  { name: "Song 4", file: "songs/song4.mp3" }
];

let current = 0;
let filtered = [...songs];

const audio = document.getElementById("audio");
const list = document.getElementById("playlist");
const title = document.getElementById("title");
const search = document.getElementById("search");
const progress = document.getElementById("progress");
const body = document.body;

// LOAD SONG
function loadSong() {
  audio.src = filtered[current].file;
  title.textContent = filtered[current].name;
  highlight();
}

// PLAY / PAUSE
function togglePlay() {
  audio.paused ? audio.play() : audio.pause();
}

// NEXT
function nextSong() {
  current = (current + 1) % filtered.length;
  loadSong();
  audio.play();
}

// PREV
function prevSong() {
  current = (current - 1 + filtered.length) % filtered.length;
  loadSong();
  audio.play();
}

// PLAYLIST RENDER
function renderList(data) {
  list.innerHTML = "";

  data.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.name;

    li.onclick = () => {
      current = index;
      loadSong();
      audio.play();
    };

    list.appendChild(li);
  });
}

renderList(filtered);

// HIGHLIGHT ACTIVE
function highlight() {
  document.querySelectorAll("#playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === current);
  });
}

// SEARCH BAR
search.addEventListener("input", (e) => {
  const val = e.target.value.toLowerCase();

  filtered = songs.filter(song =>
    song.name.toLowerCase().includes(val)
  );

  current = 0;
  renderList(filtered);
  loadSong();
});

// PROGRESS BAR
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// AUTO NEXT
audio.addEventListener("ended", nextSong);

// DARK MODE
function toggleTheme() {
  body.classList.toggle("light");
  document.getElementById("themeBtn").textContent =
    body.classList.contains("light") ? "🌙" : "☀️";
}

// INIT
loadSong();