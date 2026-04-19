
import authMiddleware from "../middlewares/auth.js";
import Org from "../models/org.model.js";

export const createOrg = async (req,res)=>{
  const user = req.user.user;
  const {title, description, admin, members} = req.body;

  if(!title){
    return res.status(400).json({message:'Title is required!'})
  }
  console.log(user);

  try {
    const org = await new Org({
      title,
      description,
      admin:user._id,
      members:[]
    })
    return res.json({message:'Org created successfully!', org})
  } catch (error) {
    return res.status(500).json("Error creating org!");
  }
}