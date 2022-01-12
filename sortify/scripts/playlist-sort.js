var playlistID = "61f45XS8TkadYTBC6Kokrm"
//var playlistID = "3riXgB8dCeuM4LnUXOX0cy"
var offset = 0;
var it = 1;

function updateLocalStorage(element)
{
    var ls = localStorage.getItem("playlist-json");
    var psize = document.getElementById("playlist-size");

    var jsontext = "\"" + it + "\" : { \"track-id\" : \"" + element.track.id + "\", \"score\" : \"0\" } ";

    if (psize.innerText != it)
        jsontext += ",";
    else
        jsontext += "}";

    ls += jsontext;
    localStorage.setItem("playlist-"+playlistID, ls);
}

function updateHTML(element)
{
    /* create ligne of the table */
    var tr = document.createElement('tr');
    var num = document.createElement('td');
    var name = document.createElement('td');
    var artists = document.createElement('td');
    var score = document.createElement('td');

    /* position number in playlist */
    num.innerHTML = it;

    /* title */
    name.innerHTML = element.track.name;

    /* artists */
    element.track.artists.forEach(artist => {
        if (artists.innerHTML == "")
            artists.innerHTML = artist.name;
        else
            artists.innerHTML += ", " + artist.name;
    })
    /* score */
    score.innerHTML = "0";
    
    /* push ligne of the table */
    tr.appendChild(num);
    tr.appendChild(name);
    tr.appendChild(artists);
    tr.appendChild(score);
    return tr;
}

function fillPlaylistTracks(plist, spotifyApi)
{
    /* create options for offset in request */
    const opt = new Object();
    opt.offset = offset;

    /* request */
    spotifyApi.getPlaylistTracks(playlistID, opt, (err, data) => new Promise((resolve, reject) => {
        if (err)
            reject(err);
        else
            resolve(data.items);
    }).then((items) => {
        /* push each song in the table */
        items.forEach(element => {
            console.log(element);
            /* change the HTML */
            plist.appendChild(updateHTML(element));
            /* change the LocalStorage */
            updateLocalStorage(element);
            it += 1;
        });
    }));
}

function getPlaylistSize(spotifyApi, playlistSize)
{
    /* create options */
    const opt = new Object();
    opt.offset = 0;

    spotifyApi.getPlaylistTracks(playlistID, opt, (err, data) => new Promise((resolve, reject) => {
        if (err)
            reject(err);
        else
            resolve(data.total);
    }).then((total) => {
        /* change the tag p with the size of the playlist */
        playlistSize.innerHTML = total;
    }));
}

function getPlaylist()
{
    /* create a SpotifyWebApi class to make request later*/
    var spotifyApi = new SpotifyWebApi();

    /* set the access token */
    spotifyApi.setAccessToken(localStorage.getItem("accessToken"));

    /* get the tag p and table to modify next */
    var psize = document.getElementById("playlist-size");
    var plist = document.getElementById("playlist-list");

    /* listen the tag p when modified */
    psize.addEventListener('DOMSubtreeModified', function() {
        fillPlaylistTracks(plist, spotifyApi);
    })
    
    /* listen the tag table when modified */
    plist.addEventListener('DOMSubtreeModified', function() {
        if (psize.innerHTML > offset && it % 100 == 0) {
            offset += 100;
            fillPlaylistTracks(plist, spotifyApi);
        }
    })

    /* reset local storage content */
    localStorage.removeItem("playlist-"+playlistID);
    localStorage.setItem("playlist-"+playlistID, "{");

    /* get size of the playlist */
    getPlaylistSize(spotifyApi, psize);
}