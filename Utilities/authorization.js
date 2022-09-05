const jwt = require("jsonwebtoken");
const config = require("../Config/config");
const responsehandler = require("./response_handler")

function verifyToken(req, res, next){
  try {
    token = req.rawHeaders[1].split(" ")[1] || req.headers["access_token"];
    if (!token) {
      return res.status(401).json(responsehandler.makeErrorResponse("A token is required for authentication"));   // 401 stands for unauthentication
    }
  } catch (err) {
    return res.status(401).json(responsehandler.makeErrorResponse(err.name));
  }
  return next();
};

function getDecodedPh(req,res){
  const token = req.rawHeaders[1].split(" ")[1] || req.headers["access_token"];
  decoded = jwt.verify(token, config.token);
  return decoded.PHONE_NO;

}


module.exports =  {
  verifyToken,
  getDecodedPh
};