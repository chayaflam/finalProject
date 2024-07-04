import jwt from 'jsonwebtoken'

export const authMiddleWare = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ error: 'No token provided.' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const ex = {}
      ex.statusCode = 401;
      ex.message = 'Unauthorized Access.';
      next(ex);
    }
    req.userId = decoded.userId;
    next();
  });
};





