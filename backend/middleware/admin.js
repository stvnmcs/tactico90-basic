
//This middleware checks if the logged-in user is an admin.
//If the user is not an admin, it returns a 403 Forbidden response.
module.exports = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
  };
  