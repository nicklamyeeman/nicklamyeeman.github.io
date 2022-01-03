//var playlistID = "5T3vz9WJ41rjOOpJ6AAURV"
var playlistID = "3riXgB8dCeuM4LnUXOX0cy"
var offset = 0;

function updateHTML(element)
{
    var tr = document.createElement('tr');
    var name = document.createElement('td');
    var artists = document.createElement('td');
    var score = document.createElement('td');

    name.innerHTML = element.track.name;
    element.track.artists.forEach(artist => {
        if (artists.innerHTML == "")
            artists.innerHTML = artist.name;
        else
            artists.innerHTML += ", " + artist.name;
    })
    score.innerHTML = "0";
    
    tr.appendChild(name);
    tr.appendChild(artists);
    tr.appendChild(score);
    return tr;
}

function fillPlaylistTracks(playlist, plist, spotifyApi)
{
    const opt = new Object();
    opt.offset = offset;

    spotifyApi.getPlaylistTracks(playlistID, opt, (err, data) => new Promise((resolve, reject) => {
        if (err)
            reject(err);
        else
            resolve(data.items);
    }).then((items) => {
        items.forEach(element => {
            playlist.push(element)
            console.log(element);

            plist.appendChild(updateHTML(element));
        });
    }));
}


function getPlaylistSize(spotifyApi, playlistSize)
{
    const opt = new Object();
    opt.offset = 0;

    spotifyApi.getPlaylistTracks(playlistID, opt, (err, data) => new Promise((resolve, reject) => {
        if (err)
            reject(err);
        else
            resolve(data.total);
    }).then((total) => {
        playlistSize.innerHTML = total;
    }));
}

function getPlaylist()
{
    /** create a SpotifyWebApi class to make request later + set the access token **/
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(localStorage.getItem("accessToken"));
    
    var playlist = [];

    var psize = document.getElementById("playlist-size");
    var plist = document.getElementById("playlist-list");


    psize.addEventListener('DOMSubtreeModified', function() {
        fillPlaylistTracks(playlist, plist, spotifyApi);
    })
    
    plist.addEventListener('DOMSubtreeModified', function() {
        if (psize.innerHTML > offset) {
            offset += 100;
            fillPlaylistTracks(playlist, plist, spotifyApi);
        } else {
            console.log(playlist);        }
    })

    /** get size of the playlist **/
    getPlaylistSize(spotifyApi, psize);
}