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

// const data = '';

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

    // data.categories.items.forEach(item => {
    //     console.log(item)
    //     category = item;
    // });
    console.log(categories)
    categories.forEach(categorie => {
        
        document.createElement('label');

    });
       // Renderfunction shamellysly copy pasted van het internet
   let html = '';

   categories.forEach(categorie => {
        console.log(categorie.name);
        let htmlSegment =   `<div class="container">
                                <label for="${categorie.id}">
                                    <p>${categorie.name}</p>
                                    <img src="${categorie.icons[0].url}"/>
                                </label>
                                <input type="checkbox" name="likedCategorie" value="${categorie.id}" id="${categorie.name}">
                            </div>`;
        html += htmlSegment;
    });
    let buttonToEnd = `<button>Verstuur</button>`;
    html += buttonToEnd;
    let form = document.querySelector('form');
    form.innerHTML = html;
};
getCategory()





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

