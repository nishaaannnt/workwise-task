const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let bearerToken =  req.headers['authorization']  || req.cookies?.token;
  const token = bearerToken.replace('Bearer ', '');
  console.log(req.headers);
  if (!token) {
    return res.status(401).json({message:"No Token provided"});
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; 
    next(); 
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


const verifySeller = (req, res, next) => {
  try {
    const decoded = req.user;
    if(decoded.role != 'seller') {
      return res.status(403).json({message:"Seller only Task"});
    }
    next(); 
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:"Internal server Error"});
  }
};

module.exports = { authMiddleware, verifySeller };
