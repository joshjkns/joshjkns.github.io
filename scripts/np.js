async function fetchNowPlaying() {
  try {
    const res = await fetch("https://lastfm.josshuaj7.workers.dev/");
    const data = await res.json();

    if (!data.recenttracks || !data.recenttracks.track.length) {
      document.getElementById("now-playing-content").innerText =
        "No recent tracks found.";
      return;
    }

    const track = data.recenttracks.track[0];
    const nowPlaying = track["@attr"] && track["@attr"].nowplaying === "true";

    if (nowPlaying) {
      const artist = track.artist["#text"];
      const title = track.name;
      const albumArt =
        track.image && track.image.length ? track.image[2]["#text"] : "";

      document.getElementById("now-playing-content").innerHTML = `
          ${albumArt ? `<img src="${albumArt}" alt="Album Art" />` : ""}
          <p><strong>${title}</strong> by <em>${artist}</em></p>
        `;
    } else {
      document.getElementById("now-playing-content").innerHTML =
        "<p>I'm not listening to anything right now :D</p>";
    }
  } catch {
    document.getElementById("now-playing-content").innerHTML =
      "<p>Failed to fetch now playing.</p>";
  }
}

fetchNowPlaying();
setInterval(fetchNowPlaying, 30000);
