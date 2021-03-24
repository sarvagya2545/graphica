const router = require('express').Router();
const DesignController = require('../controller/designs');
const passport = require('passport');
const { isDesigner } = require('../../middleware/roles');

const passportJWT = passport.authenticate('jwt', { session: false });

const debugMiddleware = (req,res, next) => {
    console.log(req.body);
    console.log(req.headers);
    console.log(req.cookies);
    console.log('THIS ROUTE GOT CALLED')
    // console.log(req);
    next();
}

router.route('/')
    .get(passportJWT, DesignController.getAllDesigns)
    .post(passportJWT, isDesigner, DesignController.AddDesign)
;

module.exports = router;