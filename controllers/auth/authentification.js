function checkAuth (req, res, next) {
    if (req.session.user) 
        next();
    else
        res.status(403).json({err: 'You must be logged in to perform this action.'});
}

module.exports = checkAuth;