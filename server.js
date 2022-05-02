console.log('hallo wereld');

/*******************************************************
 * Define some constants and variables
********************************************************/
const express = require('express');
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

/*******************************************************
 * Middleware
********************************************************/
app.use(express.static('public'));

/*******************************************************
 * Set template engine
********************************************************/

/*******************************************************
 * Routes
 * 
 * Get /
 *  home - show movielist
********************************************************/
app.get('/', (req, res) => {
    let doc = '<!doctype html>';
    doc += '<title>Movies</title>';
    doc += '<h1>Stefan Radouane</h1>';

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

app.get('/movie/:id/:slug');

/*******************************************************
 * If no routes give response, show 404
********************************************************/
app.get('/', (req, res) => {
    res.send('Hello World!')
})

/*******************************************************
 * Start webserver
********************************************************/
app.listen(port, () => {
    console.log(`Webserver lisening on port ${port}`)
})