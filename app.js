const APIcontrol = (function(){

    const clientId = '97827c6f27404e7a8ce75a072081a151';
    const clientSecret = '9d4531501fd94595a45632324e3387b5';

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
        console.log(data.access_token + 'log 1');
        return data.access_token;
    }

    return {
        getToken(){
            console.log(_getToken());
            return _getToken();
        }
    }

    

})();