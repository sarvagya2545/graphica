module.exports = {
    isCustomer: async (req,res,next) => {
        // check if req.user is actually a customer
        if(req.user.role !== 'Cus')
            return res.status(403).send('Forbidden route: only customers perform this request');

        return next();
    },
    isDesigner: async (req,res,next) => {
        // check if req.user is actually a designer
        // console.log('designer', req.user);
        if(req.user.role !== 'Des')
            return res.status(403).send('Forbidden route: only designers perform this request');

        return next();
    }
}