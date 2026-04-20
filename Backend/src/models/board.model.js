import mongoose from 'mongoose'
import Org from './org.model.js';

const boardSchema = new mongoose.Schema({
  title:{
    type:String,
    trim:true,
    required:true
  },
  description:{
    type:String,
    trim:true,
  },
  orgId:{
    type:mongoose.Types.ObjectId,
    ref:Org,
    required:true
  }
},{timestamps:true})

const Board = mongoose.model('Board', boardSchema);
export default Board