// middlewares/authentication.js

const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
   //console.log(token);

    if (!token) {
        return res.send( "Please Login again" );
    }

    jwt.verify(token, 'shhhhh', async (err, decoded) => {
        if (err) {
            return res.send({ "message": "Invalid Credential!, Please Login again" });
        } else {
            const user_id = decoded.user_id;
            req.user_id = user_id;
            // console.log(req);
            next();
        }
    });
};

module.exports = authentication;
