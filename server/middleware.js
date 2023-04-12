const checkAuth = (req, res, next) => {
    // Replace this with your own authentication logic
    if (req.headers.authorization) {
      next();
    } else {
      res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }
  };
  
  module.exports = {
    checkAuth,
  };