import jwt from 'jsonwebtoken'
export const authMiddleWare = (req, res, next) => {
  console.log(req)

  const token = req.cookie.token;
  //////
  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const ex = {}
      ex.statusCode = 401;
      ex.message = 'Unauthorized Access.';
      next(ex);
      // return res.status(402).json({ error: 'Invalid token.' });
    }
    req.userId = decoded.userId;
    
    next();
  });
};



// import jwt from 'jsonwebtoken';
// import global from '../Service/config.js'

// export const verifyToken = (req, res, next) => {
//     const token = req.headers['x-access-token'];
//     if (token) {
//         jwt.verify(token, global.config.secretKey,
//             { algorithm: global.config.algorithm },
//             function (err, decoded) {
//                 if (err) {
//                     const ex = {}
//                     ex.statusCode = 401;
//                     ex.message = 'Unauthorized Access';
//                     next(ex);
//                 }
//                 req.decoded = decoded;
//                 next();
//             });
//     } else {
//         const ex = {}
//         ex.statusCode = 403;
//         ex.message = 'Forbidden Access';
//         next(ex);
//     }
// };

