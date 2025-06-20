import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ msg: 'Not authorized. No token' });
    }

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({ msg: 'Wrong or expired token' });
            } else {
                req.user = data;  // e.g., { id: user._id }
                next();
            }
        });
    } else {
        return res.status(403).json({ msg: 'Invalid token format' });
    }
};

export default verifyToken;
