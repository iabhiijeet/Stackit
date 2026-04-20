
import authMiddleware from "../middlewares/auth.js";
import Org from "../models/org.model.js";
import User from "../models/user.model.js";

export const createOrg = async (req,res)=>{
  const user = req.user.user;
  const {title, description, admin, members} = req.body;

  if(!title){
    return res.status(400).json({message:'Title is required!'})
  }

  try {
    const org = new Org({
      title,
      description,
      admin:user._id,
      members:[]
    })
    await org.save();
    return res.json({message:'Org created successfully!', org})
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error creating org!");
  }
}

export const getOrganizations = async (req,res)=>{
  const user = req.user.user;
  try {
    const org = await Org.find({admin:user._id});
    console.log(org)
    return res.json({message:'Org fetched successfully!', org})
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error fetching organizations!");
  }
}

export const addMemberToOrg = async (req,res)=>{
  const user = req.user.user;
  const {orgId, memberEmail} = req.body;
  if(!orgId || !memberEmail){
    return res.status(400).json({message:'Org ID and Member Email are required!'})
  }

  const org = await Org.findById(orgId);

  if(org.admin !=  user._id){
    return res.status(403).json({message:'Only admin can add members to the org!'})
  }
  const member = await User.findOne({email:memberEmail});
  if(!member){
    return res.status(404).json({message:'Member not found!'})
  }
  try {
    org.members.push(member._id);
    await org.save();
    return res.status(200).json({message:'Member added to org successfully!', org})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:'Error adding member to org!'})
  }

}

export const deleteOrg = async(req,res)=>{}

export const removeMemberFromOrg = async(req,res)=>{
  const orgId = req.query.orgId;
  const user = req.user.user;
  
  try {
    const org = await Org.findOne({admin:user._id, _id:orgId});
    if(!org){
      return res.status(404).json({message:'Org not found or you are not the admin!'})
    }
    org.members.pull(memberId);
    await org.save();
    return res.status(200).json({message:'Member removed from org successfully!', org})
  } catch (error) {
    
  }
}