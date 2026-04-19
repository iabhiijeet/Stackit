
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const registrUser = async (req, res) => {
  const { name, email, password, confirmPassword} = req.body;

  if(!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if(password != confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password:hashedPassword
  })

  const token = jwt.sign({user}, process.env.SECRET_KEY,{expiresIn:'7d'})



  await user.save();

  res.status(201).json({ message: 'User registered successfully',user, token });
}

export const loginUser = async (req, res) => {
  const {email,password}=req.body;
  if(!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({email});
  if(!user){
    return res.status(400).json({'message':'Email not found!'})
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res.status(400).json({'message':'Password is incorrect!'})
  }

  const token = jwt.sign({user}, process.env.SECRET_KEY,{expiresIn:'7d'})

  res.status(200).json({message:'Login success!', user, token})
}