function onLoad()
{
    var data = "grant_type=client_credentials";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let accessToken = this.responseText.split(':')[1].split("\"")[1];
            localStorage.setItem("accessToken", accessToken);
        }
    });

    xhr.open("POST", "https://accounts.spotify.com/api/token");
    xhr.setRequestHeader("Authorization", "Basic MTMyMzk3OTQ1Zjk4NGFhZmJjNzZmZDUyOTY3ZDJlN2E6MTc2OWI2OGViYTA5NGJlM2I4NTE1NDkzNzEwYmM0YTg=");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    /*
     **  xhr.setRequestHeader("Cookie", "__Host-device_id=AQB5MM_VrrlXFNDXUpktnPXGUTDVhbS1E8oXsJz-NuRx0mZuZ0cH8zab52IJb0FVDAQb5R3Pl-xk9AvxtXImNWHsaGxMop0tBSw; sp_tr=false");
     */
    xhr.send(data);
}
