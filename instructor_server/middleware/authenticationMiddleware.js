const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(403).json({error: 'No Token provided'});

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded
        next()
    } catch (err){
        res.status(401).json({error:'Invalud token'})
    }

};

module.exports = authMiddleware