module.exports = {
    isAuthenticatedS: (req,res,next) => {
        if(req.isAuthenticated() && req.user.skill){
            return next();
        }
        res.status(401).send({status: 'unauthorized'});
    },

    isAuthenticatedT: (req,res,next) => {
        if(req.isAuthenticated() && !req.user.skill){
            return next();
        }
        res.status(401).send({status: 'unauthorized'});
    },
    
    isAuthenticatedAll: (req,res,next) => {
        if(req.isAuthenticated()){
            return next();
        }
        res.status(401).send({status: 'unauthorized'});
    }
}