const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: GoogleTokenStrategy } = require("passport-google-token");
const Customer = require('../models/Customer');
const Designer = require('../models/Designer');
const { jwtSecret } = require("./keys");

const cookieExtractor = (req) => {
    var token = null;
    if (req && req.cookies) token = req.cookies['Auth'];
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
                const [ role, id ] = payload.sub.split('-');
                var foundUser;

                if(role === 'Des') {
                    const designer = await Designer.findById(id).select("-auth.local.password");
                    if (!designer) {
                        return done(null, false);
                    }

                    foundUser = designer;
                } else {
                    const customer = await Customer.findById(id).select("-auth.local.password");
                    if (!customer) {
                        return done(null, false);
                    }    

                    foundUser = customer;
                }

                const userDetails = {
                    ...foundUser._doc,
                    role
                }

                return done(null, userDetails);

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
            usernameField: "usernameOrEmail",
        },
        async (usernameOrEmail, password, done) => {
            try {
                // find the user in db by email or username
                const findEmailCustomer = await Customer.findOne({ "auth.email": usernameOrEmail });
                const findEmailDesigner = await Designer.findOne({ "auth.email": usernameOrEmail });
                const findUsernameCustomer = await Customer.findOne({ "auth.username": usernameOrEmail });
                const findUsernameDesigner = await Designer.findOne({ "auth.username": usernameOrEmail });

                let foundUser = findEmailDesigner || findEmailCustomer || findUsernameCustomer || findUsernameDesigner;

                const isDesigner = findEmailDesigner || findUsernameDesigner;
                const role = isDesigner ? 'Des' : 'Cus';
                
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

                userdetails = {
                    ...foundUser._doc,
                    role
                }

                // Otherwise, return the user
                done(null, userdetails);
            } catch (error) {
                done(error, false);
            }
        }
    )
);