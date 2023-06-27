import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;

const Document = new Schema({
   
    _id:String ,
    data:Object
  
});


  
 export default Document