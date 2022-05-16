const APIController = (function(){

    const clientId = '97827c6f27404e7a8ce75a072081a151';
    const clientSecret = '9d4531501fd94595a45632324e3387b5';

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client+credentials'
        });
        const data = await result.json();
        return data.access_token;
    }


    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?country=NL`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        console.log(data)
        return data.items;

    }

})();

 