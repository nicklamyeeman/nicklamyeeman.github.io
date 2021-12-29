//var playlistID = "5T3vz9WJ41rjOOpJ6AAURV"
var playlistID = "3riXgB8dCeuM4LnUXOX0cy"

const fillPromise = (err, data) => new Promise((resolve, reject) => {
    if (err)
        reject(err);
    else
        resolve(data);
}).then((data) => {
    console.log(data);
    return data;
});

function fillPlaylist(playlist, offset, spotifyApi)
{
    const opt = new Object();
    opt.offset = offset;

    spotifyApi.getPlaylistTracks(playlistID, opt, fillPromise);
}

function playlistRequest(spotifyApi)
{
    var playlist = [];

    playlist = fillPlaylist(playlist, 0, spotifyApi);
}

function getPlaylist()
{
    var spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(localStorage.getItem("accessToken"));
    playlistRequest(spotifyApi);
}