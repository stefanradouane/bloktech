console.log('hoi');



// const askToken = async () => {
//     const result = await fetch('https://accounts.spotify.com/api/token', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type' : 'application/x-www-form-urlencoded', 
//                     'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
//                 },
//                 body: 'grant_type=client_credentials'
//             });
//         const log = await result.json();
//         const token = log.access_token;
//         console.log(token)
// };

// body.addEventListener('load', async(e)=>{
//     console.log(askToken + '1')
// })


// const APIcontrol = (function(){
//     const _getToken = async () => {
//         const result = await fetch('https://accounts.spotify.com/api/token', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type' : 'application/x-www-form-urlencoded', 
//                     'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
//                 },
//                 body: 'grant_type=client_credentials'
//             });
//         const data = await result.json();
//         // console.log(token)
//         return data.acces_token;
//     };

//     return {
//         getToken() {
//             return _getToken();
//         }
//     }
// })();


const clientId = '97827c6f27404e7a8ce75a072081a151';
const clientSecret = '9d4531501fd94595a45632324e3387b5';

// const form = document.querySelector('form');
// var labelCheck = document.querySelector('label');

// const token = '';

async function getCategory(){
    const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
    const log = await result.json();
    const token = log.access_token;
    // console.log(token);
    const eind = await fetch(`https://api.spotify.com/v1/browse/categories?country=NL`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    // console.log(token);
    const data = await eind.json();
    const categories = data.categories.items;

    

    
    // Renderfunction shamellysly copy pasted van het internet
    let html = '';

    categories.forEach(categorie => {
            let htmlSegment =   `<div class="container">
                                    <label for="${categorie.id}">
                                        <p>${categorie.name}</p>
                                        <img src="${categorie.icons[0].url}"/>
                                    </label>
                                    <input type="checkbox" name="categorie" value="${categorie.id}" id="${categorie.name}">
                                </div>`;
            html += htmlSegment;
        });
        let buttonToEnd = `<button>Verstuur</button>`;
        html += buttonToEnd;
        let form = document.querySelector('form.categorie');
        form.innerHTML = html;

}

const maincat = document.querySelector('main.start');

if(maincat){
    getCategory()
}



const mainLijst = document.querySelector('main.muziekLijst');

if(mainLijst){

    const section = document.querySelector('section.figure');

    let tracks = [];
    let muziek = [];

    async function getTracks(){
        // GetTOKEN
        const result = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded', 
                    'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
            });
        const log = await result.json();
        const token = log.access_token;
        console.log(token);

        let listItems = document.querySelectorAll('li.categorie');

        async function getPlaylist(catID){
            const res = await fetch(`https://api.spotify.com/v1/browse/categories/${catID}/playlists?limit=1`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
            });
            const eind = await res.json();
            return eind;
            
        }

        const playListCategories = [];

        listItems.forEach(categorie => {
            const catID = categorie.innerText;
            playListCategories.push(getPlaylist(catID))
        });


        Promise.all(playListCategories).then(data => {
            // console.log(data);
            data.forEach(link => {
                if(link.playlists == undefined){
                    // console.log('skip')
                    return
                } else{
                    const afspeellijst = link.playlists.items;
                    afspeellijst.forEach(lijst => {
                        const tracksEndPoint = lijst.tracks.href
                        tracks.push(getMuziek(tracksEndPoint))
                    })
                }
            })

            async function getMuziek(tracksEndPoint){
                const res = await fetch(`${tracksEndPoint}`, {
                    method: 'GET',
                    headers: { 'Authorization' : 'Bearer ' + token}
                });
                const eind = await res.json();
                const trackArray = eind.items;
                return trackArray
            }

            let html = '';
            

            Promise.all(tracks).then(data => {
                data.forEach(array => {
                    // console.log(array)
                    array.forEach(tracky => {
                        
                            
                            
                        
                        
                        
                        

                        const track = tracky.track;
                        muziek.push(track)
                        // console.log(muziek)
                        // console.log(track)
                        let htmlSegment =  `<section class="figure">
                                        <section>
                                            <section>
                                                <h2>${track.name}</h2>
                                                <h3>${track.artists[0].name}</h3>
                                                <form action="/ontdek" method="post">
                                                    <input type="hidden" name="trackId" value="${track.id}">
                                                    <input type="submit" name="like" value="Like">
                                                    <input type="submit" name="dislike" value="Dislike">
                                                </form>
                                            </section>
                                            <section>
                                                <img src="${track.album.images[0].url}" alt="">
                                            </section>
                                        </section>
                                        <section>
                                            <audio controls>
                                                <source src="${track.preview_url}" type="audio/ogg">
                                            </audio>
                                        </section>
                                    </section>`;
                        html += htmlSegment;
                        mainLijst.innerHTML = html;
                    })
                    
                })
                console.log(muziek)

            })  
        })
    }
    getTracks();  

    

    // Promise.all(muziek).then(data => {
    //     console.log(data)
    //     console.log(muziek)
    // })
}

const mainLikes = document.querySelector('main.likes');

let likes = [];

if(mainLikes){
    const likeId = document.querySelectorAll('li.likeId');

    async function getLikeList(){
        const result = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded', 
                        'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
                    },
                    body: 'grant_type=client_credentials'
                });
        const log = await result.json();
        const token = log.access_token;
        console.log(token)

        likeId.forEach(id => {
            const nummerId = id.innerText;
            console.log(nummerId)
            likes.push(LikeList(nummerId))
            console.log(likes)
        })

        async function LikeList(nummerId){
            const res = await fetch(`https://api.spotify.com/v1/tracks/${nummerId}`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            });
            const eind = await res.json();
            // const trackArray = eind.items;
            console.log(eind);
            return eind
        }
    };;
    getLikeList();

    
    

    
    // const Id = likeId.innerText;
}

// <!-- Functie om kaartjes te maken --!>

// tracks.forEach(track => {
//     console.log(track);
    // })



// module.exports = ((nummers));

// const _getGenre = sync 


// console.log(token);
// const eind = await fetch(`https://api.spotify.com/v1/browse/categories?country=NL`, {
//     method: 'GET',
//     headers: { 'Authorization' : 'Bearer ' + token}
// });
// // console.log(token);
// data = await eind.json();
// console.log(data.categories.items);
// return data.categories;

// console.log(_getToken())

