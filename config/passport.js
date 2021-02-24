const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: GoogleTokenStrategy } = require("passport-google-token");
const User = require("../models/User");
const { jwtSecret } = require("./keys");

const cookieExtractor = (req) => {
    var token = null;
    if (req && req.cookies) token = req.cookies['Auth'];

    console.log(req.cookies);
    return token;
}

// jwt strategy, used to get the user from jwt
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey: jwtSecret,
        },
        async (payload, done) => {
            try {
                console.log(payload);

                // Find the user specified in token
                const user = await User.findById(payload.sub).select(
                    "-auth.local.password"
                );

                console.log(user);

                // If user doesn't exists, handle it
                if (!user) {
                    return done(null, false);
                }

                // Otherwise, return the user
                done(null, user);
            } catch (error) {
                console.log(error);
                done(error, false);
            }
        }
    )
);

// LOCAL STRATEGY
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                // find the user in db
                const foundUser = await User.findOne({
                    "auth.email": email,
                });

                // If not, handle it
                if (!foundUser) {
                    return done(null, false);
                }

                // return error if the user is having social login
                if (foundUser.config.method !== "local") {
                    return done(null, false);
                }

                // Check if the password is correct
                const isMatch = await foundUser.isValidPassword(password);

                // If not, handle it
                if (!isMatch) {
                    return done(null, false);
                }

                // Otherwise, return the user
                done(null, foundUser);
            } catch (error) {
                done(error, false);
            }
        }
    )
);