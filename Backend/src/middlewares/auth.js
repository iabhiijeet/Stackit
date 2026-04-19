import jwt from 'jsonwebtoken'
function authMiddleware(req,res,next){
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.json({message:'Unauthorized!'});
  }

  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(!decoded){
      return res.status(401).json({message:'Unauthorized!'});
    }
    
    req.user = decoded;
    next()
  } catch (error) {
    console.log(error);
    return res.status(402).json({message:'Unauthorized!'});
  }
}

export default authMiddleware