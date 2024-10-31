const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    console.log('All cookies:', req.cookies);
    console.log('JWT cookie:', req.cookies?.jwt);
    
    const token = req.cookies?.jwt;
    
    if (!token) {
        console.log('No token found in cookies');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = auth;