import Mongoose from 'mongoose'

const orgSchema = new Mongoose.Schema({
  title:{
    type:String,
    trim:true,
    required:true
  },
  description:{
    type:String,
    trim:true,
  },
  admin:{
    type:Mongoose.Types.ObjectId,
    ref:'User'
  },
  members:{
    type:Mongoose.Types.ObjectId,
    ref:'User'
  }
})

const Org = Mongoose.model('Org', orgSchema);

export default Org