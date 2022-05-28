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

const app = express();
const port = process.env.PORT || 3000;


const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');

const passport = require('passport');

const methodOverride = require('method-override')


const inizializePassport = require('./passport-config');

const user = require('./passport-config');

const { use } = require('passport');



// inizializePassport(passport, email => users.find(user => user.email === email),
// id => users.find(user => user.id === id));


inizializePassport(
    passport, 
    async email => await db.collection('gebruikers').findOne({email:email}),
    id => {
        const userFound = "Hier moet de juiste id van de gebruiker komen"
        return userFound;
    }

);


    // db.collection('gebruikers').findOne({_id:id},{_id:1, name:0, email:0, password:0})
// db.collection('gebruikers').findOne(user => user._id === id))

// db.collection('gebruikers').find().project({ _id: 1}))

//  -> id die ik wil ophalen naar de variabel id 

let db = null;

let users = [];


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


app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'))


function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }

    res.redirect('/login');
}


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
// })

app.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

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

app.get('/', checkAuthenticated, async (req, res) => {
    const gebruikers = await db.collection('gebruikers').find({},{}).toArray();
    res.render('pages/index', {gebruikers}, console.log(req))
})


app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('pages/login');
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/start',
    failureRedirect: '/login',
    'session': true,
    failureFlash:true
}))

// (req, res) => {
    // try{
    //     const email = req.body.email;
    //     const password = req.body.password;
    //     const userAccount = await db.collection('gebruikers').findOne({email:email});
    //     const match = await bcrypt.compare(password, userAccount.password);

    //     if (match){
    //         res.status(201).render("pages/start");
    //     } else{
    //         res.send("password onjuist")
    //     }

    // } catch (error){
    //     res.status(400).send('email onjuist')
    // }


// })

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('pages/register');
})

   
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.collection('gebruikers').insertOne({
            "name": req.body.name,
            "email": req.body.email,
            "password": hashedPassword
        })
        users.push({
            "id": "16562535173y1731",
           "name": req.body.name,
            "email": req.body.email,
            "password": hashedPassword 
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users);
})


app.get('/start', checkAuthenticated, async (req, res) => {
    // const gebruikers = await db.collection('gebruikers').find({},{}).toArray();
    res.render('pages/start', console.log(req.session.passport.user));
})

app.post('/start', checkAuthenticated, async (req, res) => {
    
    console.log(req.body.categorie)
    console.log(req.session.passport.user)
    const categorie = arrayify(req.body.categorie);
    try {
        const query = {_id: ObjectId(req.session.passport.user)};
        const options = {projection:{_id:0, categorie:1}}
        const dbCats = await db.collection('gebruikers').findOne(query, options);
        // console.log(dbCats)
        const werkCategorie = arrayify(dbCats.categorie);
        const cat3 = werkCategorie.concat(categorie)
        const singelItem = new Set(cat3);
        const myArr = Array.from(singelItem);

        const filter = {_id: ObjectId(req.session.passport.user)};
        const updateDoc = {
            $set: {
              "categorie" : myArr
            }
          };
        db.collection('gebruikers').updateOne(filter, updateDoc, {});
     } catch (e) {
        throw (e);
     };

    res.render('pages/categorie');
})

app.get('/start/categorie', checkAuthenticated, async (req, res) => {
    res.render('pages/categorie');
})

app.get('/ontdek', checkAuthenticated, async (req, res) => {
    const query = {_id: ObjectId(req.session.passport.user)};
    const options = {projection:{_id:0, categorie:1}}
    const categorien = await db.collection('gebruikers').findOne(query, options)
    
    const optionsLike = {projection:{_id:0, like:1}}
    const likes = await db.collection('gebruikers').findOne(query, optionsLike);
    const likeId = arrayify(likes.like);

    const options3 = {projection:{_id:0, dislike:1}}
    const dislikes = await db.collection('gebruikers').findOne(query, options3)
    const dislikeId = arrayify(dislikes.dislike);

    res.render('pages/ontdek', {categorien, likeId, dislikeId});
})

app.post('/ontdek', checkAuthenticated, async (req, res) => {
    // console.log(req.body.trackId)
    try{

        const query = {_id: ObjectId(req.session.passport.user)};
    
        const trackId = req.body.trackId;

        const methode = req.body.like;

        const filter = {_id: ObjectId(req.session.passport.user)};
        
        if(methode == "like"){
            const options = {projection:{_id:0, like:1}}
            const likes = await db.collection('gebruikers').findOne(query, options);

            const werkCategorie = arrayify(likes.like);

            const cat3 = werkCategorie.concat(trackId)

            const singelItem = new Set(cat3);
            const myArr = Array.from(singelItem);

            const updateDoc = {
                $set: {
                    "like" : myArr
                }
            };
            
            db.collection('gebruikers').updateOne(filter, updateDoc, {});

        } else{
            const options = {projection:{_id:0, dislike:1}}
            const dislikes = await db.collection('gebruikers').findOne(query, options);
            console.log(dislikes)

            const werkCategorie = arrayify(dislikes.dislike);
            const cat3 = werkCategorie.concat(trackId);
            const singelItem = new Set(cat3);
            const myArr = Array.from(singelItem);
            
            const updateDoc = {
                $set: {
                    "dislike" : myArr
                }
            };

            db.collection('gebruikers').updateOne(filter, updateDoc, {});
            
        }
        
    } catch (e) {
        throw (e);
    };
    const query = {_id: ObjectId(req.session.passport.user)};
    const options = {projection:{_id:0, categorie:1}}
    const categorien = await db.collection('gebruikers').findOne(query, options)
    // Likes en dislikes ophalen uit database

    const optionsLike = {projection:{_id:0, like:1}}
    const likes = await db.collection('gebruikers').findOne(query, optionsLike);
    const likeId = arrayify(likes.like);

    const options3 = {projection:{_id:0, dislike:1}}
    const dislikes = await db.collection('gebruikers').findOne(query, options3)
    const dislikeId = arrayify(dislikes.dislike);


    res.render('pages/ontdek', {categorien, likeId, dislikeId})
})

app.get('/likes', checkAuthenticated, async(req, res) => {
    const query = {_id: ObjectId(req.session.passport.user)};
    const options = {projection:{_id:0, like:1}}
    
    const likes = await db.collection('gebruikers').findOne(query, options);
    const likeId = arrayify(likes.like);
    res.render('pages/likes', {likeId});
})

app.post('/likes', checkAuthenticated, async(req, res) => {
    const likeId = [];

    try{bd  
        const query = {_id: ObjectId(req.session.passport.user)};
        const options = {projection:{_id:0, like:1}}
        const likes = await db.collection('gebruikers').findOne(query, options);
        const likeArray = arrayify(likes.like);
        const value = req.body.trackId
        console.log(value)

        const likeIds = likeArray.filter(function(item){
            return item != value
        })
        likeIds.forEach(id => {
            likeId.push(id)
        })
        const filter = {_id: ObjectId(req.session.passport.user)};
        const updateDoc = {
            $set: {
                "like" : likeId
            }
        };
        db.collection('gebruikers').updateOne(filter, updateDoc, {});
    }   catch (e) {
            throw (e);
    };
    res.render('pages/likes', {likeId})
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
        console.log('connect')
        const gebruikers = await db.collection('gebruikers').find({},{}).toArray();
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
