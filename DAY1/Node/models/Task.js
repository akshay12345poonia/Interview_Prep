const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },       
  description: { type: String, default: "" },          
  status:      { type: String, 
                 enum: ["pending","in progress","done"], 
                 default: "pending" }  
});


module.exports = mongoose.model("Task", taskSchema);
