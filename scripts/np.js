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
      const limit = 20;
      const title = track.name;
      const albumArt =
        track.image && track.image.length ? track.image[2]["#text"] : "";

      document.getElementById("now-playing-content").innerHTML = `
          ${albumArt ? `<img src="${albumArt}" alt="Album Art" />` : ""}
          <p><strong>${title.substring(
            0,
            limit
          )}</strong> by <br /><em>${artist.substring(0, limit)}</em></p>
        `;
    } else {
      document.getElementById("now-playing-content").innerHTML =
        "<strong><p><br /><br /><br />I'm not listening right now D:<br /><br /><br /></p></strong>";
    }
  } catch {
    document.getElementById("now-playing-content").innerHTML =
      "<strong><p><br /><br /><br />Failed to get playing song D:<br /><br /><br /></p></strong>";
  }
}

fetchNowPlaying();
setInterval(fetchNowPlaying, 30000);
