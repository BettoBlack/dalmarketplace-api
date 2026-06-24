const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'MISSING_TOKEN',
      message: 'Authorization header with Bearer token is required'
    });
  }

  const token = authHeader.split(' ')[1];

  // Demo: accept "demo-token-dal2025" as valid
  if (token !== 'demo-token-dal2025') {
    return res.status(401).json({
      error: 'INVALID_TOKEN',
      message: 'The provided token is invalid or has expired'
    });
  }

  // Attach user to request (simulates decoded JWT)
  req.user = { userId: 'usr-demo', email: 'demo@dal.ca' };
  next();
};

module.exports = { verifyToken };
