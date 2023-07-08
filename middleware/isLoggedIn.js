    module.exports = (req, res, next) => {
        if (!req.session.currentUser) {
        req.app.locals.isLoggedIn = false;
        } else {
        req.app.locals.isLoggedIn = true;
        }
        console.log('isLoggedIn: ', req.app.locals.isLoggedIn);
        next();
    };