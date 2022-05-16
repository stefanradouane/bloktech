/*******************************************************
 * Define some constants and variables
********************************************************/
const express = require('express');
let ejs = require('ejs');

const app = express();
const port = 3000;

const movies = [
    {
        "id": 1,
        "slug": "black-panther",
        "name": "Black Panther",
        "year": "2018",
        "categories": ["action", "adventures", "sci-fi"],
        "storyline": "T'Challa said 'wakanda forever!', this is a very inspirering quote."
    },
    {
        "id": 2,
        "slug": "thor-ragnarok",
        "name": "Thor Ragnarok",
        "year": "2016",
        "categories": ["action", "adventures", "sci-fi"],
        "storyline": "Thor is trying to prevent ragnarok, the ending of Argard"
    },
    {
        "id": 3,
        "slug": "ironman-2",
        "name": "Ironman 2",
        "year": "2011",
        "categories": ["action", "adventures", "sci-fi"],
        "storyline": "Tony Stark has a conflict with the government. He want's to keep the knowledge of te ironman suit for himself."
    },
    {
        "id": 4,
        "slug": "doctor-strange",
        "name": "Doctor Strange",
        "year": "2018",
        "categories": ["action", "adventures", "sci-fi", "magic"],
        "storyline": "Doctor Steven Strange gets himself in a car accident, he lost his feeling in his hands and is trying to fix his hands."
    }
]

let namen = require('./database/database');
let nummers = require('./database/database');


/*******************************************************
 * Middleware
********************************************************/
app.use(express.static('public'));

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
app.get('/', (req, res) => {
    let doc = '<!doctype html>';
    doc += '<title>Movies</title>';
    doc += '<h1>Movies</h1>';

    movies.forEach(movie => {
        doc += "<section>";
        doc += `<h2>${movie.name}</h2>`
        doc += `<h3>${movie.year}</h3>`
        doc += '<ul>';
        movie.categories.forEach(category => {
            doc += `<li>${category}</li>`;
        });
        doc += '</ul>';
        doc += `<a href="/movie/${movie.id}/${movie.slug}">More info</a>`;
        doc += '</section>';
    });
    res.send(doc);
})

app.get('/movie/:id/:slug', (req, res) => {
    // console.log(req.params.id)
    let movie = movies.find(element => element.id == req.params.id);
    console.log(movie);
    // Render Page
    let doc = '<!doctype html>';
    doc += `<title>Movie details for ${movie.name}</title>`;
    doc += `<h1>${movie.name}</h1>`;
    doc += `<h2>${movie.year}</h2>`;
    doc += `<h3>Categories</h3>`;
    doc += '<ul>';
    movie.categories.forEach(category => {
        doc += `<li>${category}</li>`;
    });
    doc += '</ul>';
    doc += `<p>${movie.storyline}</p>`;
    // doc += `<a href="/movie/${movie.id}/${movie.slug}">More info</a>`;
    res.send(doc);
});

app.get('/sounder', (req, res) => {
    res.render('pages/index', {nummers});
})

app.get('/sounder/ontdek', (req, res) => {
    res.render('pages/ontdek');
})

app.get('/sounder/likes', (req, res) => {
    res.render('pages/likes');
})

app.get('/login', (req, res) => {
    res.send("Very good very nice");
})

/*******************************************************
 * If no routes give response, show 404
********************************************************/
app.use( (req, res) => {
    res.status(404).send("Error 404: file not found");
})

/*******************************************************
 * Start webserver
********************************************************/
app.listen(port, () => {
    console.log(`Webserver lisening on port ${port}`)
})