const jwt = require('jsonwebtoken');
 const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      if (decoded.user.role==='admin'){
      next(); 
      }else{ 
        return res.status(401).json({ message: 'Unauthorized admin' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
  const verifyTokenuser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
     if (decoded.user.role==='user'){
      next(); 
     }else{ 
      return res.status(401).json({ message: 'Unauthorized user' });
     }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  
  module.exports= {verifyToken,verifyTokenuser};