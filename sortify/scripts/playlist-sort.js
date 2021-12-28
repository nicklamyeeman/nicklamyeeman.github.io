function playlistRequest(spotifyApi)
{
    spotifyApi.getPlaylistTracks("3riXgB8dCeuM4LnUXOX0cy", (data) = function(err, data) {
        if (err)
            console.error(err);
        else {
            var playlistLen = data.total;
            var tracksNames = [];
            data.items.forEach(element => {
                tracksNames.push(element.track.name + " - " + element.track.artists[0].name)
            });
            console.log(tracksNames);
        }
    });
}

function getPlaylist()
{
    var spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(localStorage.getItem("accessToken"));
    playlistRequest(spotifyApi);
}