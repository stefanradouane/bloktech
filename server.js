/*******************************************************
 * Define some constants and variables
********************************************************/
const express = require('express');
let ejs = require('ejs');

const arrayify = require('array-back');
var bodyParser = require('body-parser');

const fetch = require('node-fetch');

const dotenv = require('dotenv').config();

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

let db = null;

const app = express();
const port = process.env.PORT || 3000;
const categories = ["likes","like"];

// let namen = require('./database/database');
// let nummers = require('./database/database');
// const data = require('./public/scripts/script');
// console.log(data)


/*******************************************************
 * Middleware
********************************************************/
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/save-categorie', (req, res)=>{
    res.send(req.body)
    // console.log(req.body)
});

// function add(req, res){
//     var id = slug;
// }

// app.use('/styles', express.static(__dirname + 'public/styles'))
// app.use('/scripts', express.static(__dirname + 'public/scripts'))
// app.use('/images', express.static(__dirname + 'public/images'))

/*******************************************************
 * Set template engine
********************************************************/
app.set('view engine', 'ejs');


/*******************************************************
 * Routes
 * 
 * Get /
 *  home - show movielist
********************************************************/
// app.get('/', (req, res) => {
//     let doc = '<!doctype html>';
//     doc += '<title>Movies</title>';
//     doc += '<h1>Movies</h1>';

//     movies.forEach(movie => {
//         doc += "<section>";
//         doc += `<h2>${movie.name}</h2>`
//         doc += `<h3>${movie.year}</h3>`
//         doc += '<ul>';
//         movie.categories.forEach(category => {
//             doc += `<li>${category}</li>`;
//         });
//         doc += '</ul>';
//         doc += `<a href="/movie/${movie.id}/${movie.slug}">More info</a>`;
//         doc += '</section>';
//     });
//     res.send(doc);
// })

// app.get('/movie/:id/:slug', (req, res) => {
//     // console.log(req.params.id)
//     let movie = movies.find(element => element.id == req.params.id);
//     console.log(movie);
//     // Render Page
//     let doc = '<!doctype html>';
//     doc += `<title>Movie details for ${movie.name}</title>`;
//     doc += `<h1>${movie.name}</h1>`;
//     doc += `<h2>${movie.year}</h2>`;
//     doc += `<h3>Categories</h3>`;
//     doc += '<ul>';
//     movie.categories.forEach(category => {
//         doc += `<li>${category}</li>`;
//     });
//     doc += '</ul>';
//     doc += `<p>${movie.storyline}</p>`;
//     // doc += `<a href="/movie/${movie.id}/${movie.slug}">More info</a>`;
//     res.send(doc);
// });

app.get('/', async (req, res) => {
    const gebruikers = await db.collection('gebruikers').find({},{}).toArray();
    res.render('pages/index', {gebruikers})})

app.get('/start', async (req, res) => {
    const gebruikers = await db.collection('gebruikers').find({},{}).toArray();
    res.render('pages/start', {gebruikers, categories});
})

app.post('/start', (req, res) => {
    console.log(req.body.categorie)
    const categorie = arrayify(req.body.categorie);
    console.log(categorie)
    gebruikers.push(categorie);

    res.render('pages/categorie', console.log(categories));
})

app.get('/start/categorie', (req, res) => {
    res.render('pages/categorie');
})

app.get('/ontdek', (req, res) => {
    res.render('pages/ontdek');
})

app.get('/likes', (req, res) => {
    res.render('pages/likes');
})

app.get('/login', (req, res) => {
    res.render('pages/login');
})

app.get('/register', (req, res) => {
    res.render('pages/register');
})

/*******************************************************
 * If no routes give response, show 404
********************************************************/
app.use( (req, res) => {
    res.status(404).send("Error 404: file not found");
})

/*******************************************************
 * Connect to database
********************************************************/
async function connectDB(){
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try{
        await client.connect();
        db = client.db(process.env.DB_NAME);
    } catch (error){
        throw error;
    }
}

/*******************************************************
 * Start webserver
********************************************************/
app.listen(port, () => {
    console.log('+/================================================/+\n\n');
    console.log(`Webserver lisening on port ${port}\n`);
    connectDB().then(console.log('We have connection to mongoDB\n\n'));
    console.log('+/================================================/+\n\n');
})
