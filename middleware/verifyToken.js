async function verify(req, res, next) {
    try {
        const authHeader = req.header('authorization'); 
        if (authHeader == null || authHeader != '123456789') return res.status(401).send('Access Denied!');
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
        next(error);
    }
}

module.exports = exports = verify
