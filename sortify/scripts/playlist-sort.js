function fillPlaylist(playlist, offset, spotifyApi)
{
    const fill_playlist = new Promise((resolve, reject) => {
        setTimeout(() => {
            const opt = new Object();
            opt.offset = offset;

            spotifyApi.getPlaylistTracks("3riXgB8dCeuM4LnUXOX0cy", opt, function(err, data) {
                if (err)
                    reject(err);
                else {
                    resolve(data);
                }
            })
        }, 100);
    });

    fill_playlist.then((data) => {
        data.items.forEach(element => {
            playlist.push(element.track);
        });
        if (data.total > offset) {
            offset += 100;
            fillPlaylist(playlist, offset, spotifyApi);
        }
        return (playlist);
    });
}

function playlistRequest(spotifyApi)
{
    var playlist = [];

    const playlist_request = new Promise((resolve, reject) => {
        setTimeout(() => {
            playlist = fillPlaylist(playlist, 0, spotifyApi);
        }, 100);
        resolve(playlist);
    });

    playlist_request.then((data) => {
        console.log(data);
    });
}

function getPlaylist()
{
    var spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(localStorage.getItem("accessToken"));
    playlistRequest(spotifyApi);
}