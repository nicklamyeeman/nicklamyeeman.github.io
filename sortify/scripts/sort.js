function connectSpotify()
{
    var spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken("BQB-yNpEegvEjYCPQUULPZaygekINH196-RW3cnwyz3h7LM9bmZHLhcoUGzSiQigfC55o-l6NchqE4bKml8");
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
        if (err) console.error(err);
        else console.log('Artist albums', data);
      });      
}

function printResponse(response)
{
    console.log(response);
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}