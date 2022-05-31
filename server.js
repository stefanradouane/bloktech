/*******************************************************
 * Define some constants and variables
 ********************************************************/

const express = require("express");
let ejs = require("ejs");

const arrayify = require("array-back");
var bodyParser = require("body-parser");

const fetch = require("node-fetch");

const dotenv = require("dotenv").config();

const {
	MongoClient,
	ObjectId
} = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");

const passport = require("passport");

const methodOverride = require("method-override");

const inizializePassport = require("./passport-config");

const user = require("./passport-config");

const {
	use
} = require("passport");

const toplist = require('./apifallback');





let db = null;

const myDatabase = process.env.DB_COLLECTION;


const dbLijst = process.env.DB_COLLECTION_TWO;






inizializePassport(
	passport,
	async (email) => await db.collection(myDatabase).findOne({
			email: email
		}),
		(id) => {
			const userFound = "User logged in!";
			return userFound;
		}
);

/*******************************************************
 * Middleware
 ********************************************************/
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.post("/save-categorie", (req, res) => {
	res.send(req.body);
});

app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUnitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}

app.delete("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/login");
	});
});

/*******************************************************
 * Set template engine
 ********************************************************/
app.set("view engine", "ejs");

/*******************************************************
 * Routes
 *
 * Get /
 *  home - show movielist
 ********************************************************/

app.get("/", checkAuthenticated, async (req, res) => {

	// Get username 
	const query = {
		_id: ObjectId(req.session.passport.user)
	};
	const options = {
		projection: {
			_id: 0,
			name: 1
		}
	};
	// const username
	const username = await db.collection(myDatabase).findOne(query, options);
	const naam = username.name;
	// geef const mee aan site
	res.render("pages/index", {
		naam
	});
});

app.get("/login", checkNotAuthenticated, (req, res) => {
	res.render("pages/login");
});

app.post(
	"/login",
	checkNotAuthenticated,
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		session: true,
		failureFlash: true,
	})
);

app.get("/register", checkNotAuthenticated, (req, res) => {
	res.render("pages/register");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		await db.collection(myDatabase).insertOne({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});
		res.redirect("/login");
	} catch {
		res.redirect("/register");
	}
});

app.get("/start", checkAuthenticated, async (req, res) => {
	const query = {
		_id: ObjectId(req.session.passport.user)
	};
	const options = {
		projection: {
			_id: 0,
			categorie: 1
		}
	};
	const categories = await db.collection(myDatabase).findOne(query, options);
	const werkCat = categories.categorie;
	res.render("pages/start", {
		werkCat
	});
});

app.post("/start", checkAuthenticated, async (req, res) => {
	const categorie = arrayify(req.body.categorie);
	const filter = {
		_id: ObjectId(req.session.passport.user)
	};
	const updateDoc = {
		$set: {
			categorie: categorie,
		},
	};
	db.collection(myDatabase).updateOne(filter, updateDoc, {});
	res.render("pages/categorie");
});


app.get("/ontdek", checkAuthenticated, async (req, res) => {
	const query = {
		_id: ObjectId(req.session.passport.user)
	};
	const options = {
		projection: {
			_id: 0,
			categorie: 1
		}
	};
	const categorien = await db.collection(myDatabase).findOne(query, options);

	const optionsLike = {
		projection: {
			_id: 0,
			like: 1
		}
	};
	const likes = await db.collection(myDatabase).findOne(query, optionsLike);
	const likeId = arrayify(likes.like);

	const options3 = {
		projection: {
			_id: 0,
			dislike: 1
		}
	};
	const dislikes = await db.collection(myDatabase).findOne(query, options3);
	const dislikeId = arrayify(dislikes.dislike);
	// when categorien = empty :res.render(/categorie)
	if (categorien.categorie == undefined) {
		res.redirect("/start");
	} else {
		res.render("pages/ontdek", {
			categorien,
			likeId,
			dislikeId
		});
	}
});

app.post("/ontdek", checkAuthenticated, async (req, res) => {
	// console.log(req.body.trackId)
	const query = {
		_id: ObjectId(req.session.passport.user)
	};

	const trackId = req.body.trackId;

	const methode = req.body.like;

	const filter = {
		_id: ObjectId(req.session.passport.user)
	};

	if (methode == "like") {
		const options = {
			projection: {
				_id: 0,
				like: 1
			}
		};
		const likes = await db.collection(myDatabase).findOne(query, options);

		const werkCategorie = arrayify(likes.like);

		const cat3 = werkCategorie.concat(trackId);

		const singelItem = new Set(cat3);
		const myArr = Array.from(singelItem);

		const updateDoc = {
			$set: {
				like: myArr,
			},
		};

		db.collection(myDatabase).updateOne(filter, updateDoc, {});
	} else {
		const options = {
			projection: {
				_id: 0,
				dislike: 1
			}
		};
		const dislikes = await db.collection(myDatabase).findOne(query, options);
		console.log(dislikes);

		const werkCategorie = arrayify(dislikes.dislike);
		const cat3 = werkCategorie.concat(trackId);
		const singelItem = new Set(cat3);
		const myArr = Array.from(singelItem);

		const updateDoc = {
			$set: {
				dislike: myArr,
			},
		};

		db.collection(myDatabase).updateOne(filter, updateDoc, {});
	}

	const optionsCat = {
		projection: {
			_id: 0,
			categorie: 1
		}
	};
	const categorien = await db
		.collection(myDatabase)
		.findOne(query, optionsCat);
	// Likes en dislikes ophalen uit database

	const optionsLike = {
		projection: {
			_id: 0,
			like: 1
		}
	};
	const likes = await db.collection(myDatabase).findOne(query, optionsLike);
	const likeId = arrayify(likes.like);

	const options3 = {
		projection: {
			_id: 0,
			dislike: 1
		}
	};
	const dislikes = await db.collection(myDatabase).findOne(query, options3);
	const dislikeId = arrayify(dislikes.dislike);

	res.render("pages/ontdek", {
		categorien,
		likeId,
		dislikeId
	});
});

app.get("/likes", checkAuthenticated, async (req, res) => {
	const query = {
		_id: ObjectId(req.session.passport.user)
	};
	const options = {
		projection: {
			_id: 0,
			like: 1
		}
	};

	const likes = await db.collection(myDatabase).findOne(query, options);
	const likeId = arrayify(likes.like);
	res.render("pages/likes", {
		likeId
	});
});

app.post("/likes", checkAuthenticated, async (req, res) => {
	const query = {
		_id: ObjectId(req.session.passport.user)
	};
	const options = {
		projection: {
			_id: 0,
			like: 1
		}
	};
	const likes = await db.collection(myDatabase).findOne(query, options);
	const likeArray = arrayify(likes.like);
	const value = req.body.trackId;
	console.log(value);

	const likeId = likeArray.filter(function (item) {
		return item != value;
	});
	const filter = {
		_id: ObjectId(req.session.passport.user)
	};
	const updateDoc = {
		$set: {
			like: likeId,
		},
	};

	db.collection(myDatabase).updateOne(filter, updateDoc, {});
	res.render("pages/likes", {
		likeId
	});
});

app.get("/dislikes", checkAuthenticated, async (req, res) => {
	const query = {
		_id: ObjectId(req.session.passport.user)
	};
	const options = {
		projection: {
			_id: 0,
			dislike: 1
		}
	};
	const dislikes = await db.collection(myDatabase).findOne(query, options);
	const dislikeArray = arrayify(dislikes.dislike);
	console.log(dislikeArray);
	res.render("pages/dislikes", {
		dislikeArray
	});
});

app.post("/dislikes", checkAuthenticated, async (req, res) => {
	const query = {
		_id: ObjectId(req.session.passport.user)
	};
	const options = {
		projection: {
			_id: 0,
			dislike: 1
		}
	};
	const dislikes = await db.collection(myDatabase).findOne(query, options);
	const dislikeLijst = arrayify(dislikes.dislike);
	const value = req.body.trackId;
	console.log(value);

	const dislikeArray = dislikeLijst.filter(function (item) {
		return item != value;
	});
	const filter = {
		_id: ObjectId(req.session.passport.user)
	};
	const updateDoc = {
		$set: {
			dislike: dislikeArray,
		},
	};

	db.collection(myDatabase).updateOne(filter, updateDoc, {});
	res.render("pages/dislikes", {
		dislikeArray
	});
});

/*******************************************************
 * If no routes give response, show 404
 ********************************************************/
app.use((req, res) => {
	res.status(404).send("Error 404: file not found");
});

/*******************************************************
 * Connect to database
 ********************************************************/
async function connectDB() {
	const uri = process.env.DB_URI;
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		db = client.db(process.env.DB_NAME);
	} catch (error) {
		throw error;
	}
}

/*******************************************************
 * Start webserver
 ********************************************************/
app.listen(port, () => {
	console.log("+/================================================/+\n\n");
	console.log(`Webserver lisening on port ${port}\n`);
	connectDB().then(console.log("We have connection to mongoDB\n\n"));
	console.log("+/================================================/+\n\n");
});


async function addToplist() {
	const myTracks = await toplist.getToplist()

	async function currentList() {
		// console.log(myTracks)

		const filter = {
			"name": "toplist",
		};

		const updateDoc = {
			$set: {
				myTracks: myTracks
			}
		};

		await db.collection(dbLijst).updateOne(filter, updateDoc, {});
		console.log('done')


		// const options = {
		// 	projection: {
		// 		_id: 0,
		// 		myTracks: 1
		// 	}
		// };
		// const list = await db.collection(dbLijst).findOne(filter, options);
		// console.log(list)
	}

	currentList()



	// async function UpdateList() {
	// 	await db.collection(dbLijst).insertOne({
	// 		myTracks
	// 	});
	// }
	// UpdateList()





	// myTracks.forEach(track => {

	// 	

	// 	if(song.id == track.id){
	// 		console.log('match')
	// 	}



	// })
}
addToplist()