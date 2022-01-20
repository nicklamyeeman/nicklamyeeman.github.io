// var playlistID = "61f45XS8TkadYTBC6Kokrm"
//var playlistID = "3riXgB8dCeuM4LnUXOX0cy"
var offset = 0;
var it = 1;

function updateLocalStorage(element, playlistID)
{
    var ls = localStorage.getItem("playlist-" + playlistID);
    var psize = document.getElementById("playlist-size");

    var jsontext = "\"" + it + "\" : { \"track-id\" : \"" + element.track.id + "\", \"score\" : \"0\" } ";

    if (psize.innerText != it)
        jsontext += ",";
    else
        jsontext += "}";
        ls += jsontext;

    localStorage.setItem("playlist-"+playlistID, ls);
}

function updateHTML(element, sc)
{
    /* CREATE HTML ELEMENTS */
    var tr = document.createElement('tr');
    var num = document.createElement('td');
    var name = document.createElement('td');
    var artists = document.createElement('td');
    var score = document.createElement('td');

    /* FILL HTML ELEMENTS */
    num.innerHTML = it;
    name.innerHTML = element.name;
    element.artists.forEach(artist => {
        if (artists.innerHTML == "")
            artists.innerHTML = artist.name;
        else
            artists.innerHTML += ", " + artist.name;
    })
    score.innerHTML = sc;
    
    /* APPEND HTML ELEMENTS */
    tr.appendChild(num);
    tr.appendChild(name);
    tr.appendChild(artists);
    tr.appendChild(score);
    return tr;
}

function fillPlaylistTracks(plist, spotifyApi, playlistID)
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
            plist.appendChild(updateHTML(element.track, "0"));
            updateLocalStorage(element, playlistID);
            it += 1;
        });
    }));
}

function getPlaylistSize(spotifyApi, playlistSize, playlistID)
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

function getPlaylistID()
{
    var input = document.getElementById("playlist-link");

    /* parse if needed */
        /* TO DO */

    return input.value;
}

function newPlaylist(playlistID, spotifyApi)
{
    /* SET LOCAL STORAGE */
    localStorage.setItem("playlist-"+playlistID, "{");

    /* GET HTML FOR SIZE AND TABLE OF SONGS */
    var psize = document.getElementById("playlist-size");
    var plist = document.getElementById("playlist-list");

    /* EVENT WHEN MODIFY PLAYLIST SIZE */
    psize.addEventListener('DOMSubtreeModified', function() {
         fillPlaylistTracks(plist, spotifyApi, playlistID);
    });
    
    /* EVENT WHEN MODIFY PLAYLIST LIST */
    plist.addEventListener('DOMSubtreeModified', function() {
        if (psize.innerHTML > offset && it % 100 == 0) {
            offset += 100;
            fillPlaylistTracks(plist, spotifyApi, playlistID);
        }
    });

    /* GET PLAYLIST SIZE */
    getPlaylistSize(spotifyApi, psize, playlistID);
}

function getMyTracks(plist, spotifyApi, tracksID, scores)
{
    spotifyApi.getTracks(tracksID, (err, data) => new Promise((resolve, reject) => {
        if (err)
            reject(err);
        else
            resolve(data);
    }).then((data) => {
        for (let i = 0; i != data.tracks.length; i++) {
            plist.appendChild(updateHTML(data.tracks[i], scores[i]));
            it += 1;
        }
    }));
}

function loadPlaylist(playlist, playlistID, spotifyApi)
{
    /* PARSE LOCAL STORAGE */
    var playlist = JSON.parse(playlist);

    /* GET HTML FOR SIZE AND TABLE OF SONGS */
    var psize = document.getElementById("playlist-size");
    var plist = document.getElementById("playlist-list");

    /* EVENT WHEN MODIFY PLAYLIST SIZE */
    psize.addEventListener('DOMSubtreeModified', function() {
        var tracks =[]
        var scores = [];
        for (let i = it; i != it + 50; i++) {
            tracks.push(playlist[i]["track-id"]);
            scores.push(playlist[i]["score"]);
        }
        getMyTracks(plist, spotifyApi, tracks, scores);
    });

    plist.addEventListener('DOMSubtreeModified', function() {
        if (it % 50 === 0) {
            var tracks = [];
            var scores = [];
            for (let i = it; i < parseInt(psize.innerHTML) && i != it + 50; i++) {
                tracks.push(playlist[i]["track-id"]);
                scores.push(playlist[i]["score"]);
            }
            getMyTracks(plist, spotifyApi, tracks, scores);
        }
    });

    /* GET PLAYLIST SIZE */
    getPlaylistSize(spotifyApi, psize, playlistID);
}

function getPlaylist()
{
    /* GET PLAYLSIT ID */
    var playlistID = getPlaylistID();

    /* SETUP API + ACCESS TOKEN */
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(localStorage.getItem("accessToken"));

    /* CEHCK IF PLAYLSIT ALREADY TREATED */
    var playlist = localStorage.getItem("playlist-" + playlistID);
    if (playlist === null)
        newPlaylist(playlistID, spotifyApi);
    else
        loadPlaylist(playlist, playlistID, spotifyApi);
}