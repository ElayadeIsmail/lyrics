const songsEl = document.querySelector(".resent-songs");
const lyricsEl = document.querySelector(".lyrics-show");
const apiURL = "https://api.lyrics.ovh";

const data = [
  "dua lipa",
  "drake",
  "sia",
  "katy perry",
  "taylor swift",
  "rihanna",
  "kendrick lamar",
  "j cole",
  "billie eilish",
  "eminem",
  "halsey",
  "justin bieber",
];
const term = data[Math.floor(Math.random() * data.length)];
console.log(term);
async function getSongs() {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  displaySongs(data.data);
}

function displaySongs(data) {
  data.map((song) => {
    const title = song.title;
    const image = song.album.cover_xl;
    const artist = song.artist.name;
    const box = document.createElement("div");
    box.className = "box";
    box.setAttribute("data-artist", `${artist}`);
    box.setAttribute("data-title", `${title}`);
    box.innerHTML = `

      <img
        src="${image}"
        alt="${artist}"
      />
      <p><strong>${artist}</strong>-<span>${title}</

    `;
    songsEl.appendChild(box);
  });
}
getSongs();

async function getLyrics(e) {
  const artist = e.target.dataset.artist;
  const title = e.target.dataset.title;
  const res = await fetch(`${apiURL}/v1/${artist}/${title}`);
  const data = await res.json();
  displayLyrics(data, artist, title);
}
function displayLyrics(data, artist, title) {
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  songsEl.innerHTML = "";
  if (lyrics === undefined) {
    lyricsEl.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle} Not available for Now 😔 Try Later</h2>`;
  } else {
    lyricsEl.innerHTML = `<h2><strong>${artist}</strong> - ${title}</h2>
    <span>${lyrics}</span>`;
  }

  console.log(lyrics, artist, title);
}

songsEl.addEventListener("click", (e) => {
  if (e.target.className === "box") {
    getLyrics(e);
  }
});
