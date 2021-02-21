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

// GOOGLE LOGIN STRATEGY
// passport.use(
//     "googleToken",
//     new GoogleTokenStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 // get full profile with access and refresh tokens.
//                 // console.log('profile', profile);
//                 // console.log('accessToken', accessToken);
//                 // console.log('refreshToken', refreshToken);

//                 const existingGoogleUser = await User.findOne({
//                     "auth.google.id": profile.id,
//                 });
//                 const existingLocalUser = await User.findOne({
//                     "auth.email": profile.emails[0].value,
//                 });

//                 if (existingGoogleUser) {
//                     return done(null, existingGoogleUser);
//                 }

//                 if (existingLocalUser) {
//                     existingLocalUser.auth.google = {
//                         id: profile.id,
//                     };
//                     existingLocalUser.save();

//                     return done(null, existingLocalUser);
//                 }

//                 const newUser = new User({
//                     config: {
//                         method: "google",
//                     },
//                     auth: {
//                         username: "not-set",
//                         email: profile.emails[0].value,
//                         google: {
//                             id: profile.id,
//                         },
//                     },
//                 });

//                 console.log("newUser", newUser);
//                 newUser.save();
//                 done(null, newUser);
//             } catch (err) {
//                 done(err, false, error.message);
//             }
//         }
//     )
// );
