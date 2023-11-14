import * as jwt from 'jsonwebtoken';

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' });
  }

  await jwt.verify(token, '3QwPqL20WzOEq9wG3qchq46kMEGDE9ob', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    if (user instanceof Object) {
      req.user = user;
      console.log(req.user);
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
  });
  console.log(req.user)
};

export default authenticateToken;
