const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
	const authenticateUser = async (email, password, done) => {
		const user = await getUserByEmail(email);
		if (user == null) {
			return done(null, false, {
				message: "Geen gebruikers gevonden"
			});
		}
		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, {
					message: "Fout wachtwoord"
				});
			}
		} catch (e) {
			return done(e);
		}
	};

	passport.use(new LocalStrategy({
		usernameField: "email"
	}, authenticateUser));

	passport.serializeUser((user, done) => {
		done(null, user._id.toString());
	});
	passport.deserializeUser((id, done) => {
		return done(null, getUserById(id));
	});
}

module.exports = initialize;