const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token') || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecrettoken');
    req.user = decoded.user || decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

const requireRoles = (...roles) => (req, res, next) => {
  const userRole = req.user.role || (req.user.isAdmin ? 'admin' : 'user');
  console.log('requireRoles check:', {
    user: req.user,
    userRole,
    requiredRoles: roles,
    hasAccess: roles.includes(userRole)
  });
  
  if (!req.user || !roles.includes(userRole)) {
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  }
  next();
};

module.exports = { verifyToken, requireRoles };
