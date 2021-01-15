const mongoose= require('mongoose');
  const { Schema } = mongoose;

  const UserSchema= new Schema({
      Name:{
          type: String,
          required:true
      },

      Email:{
          type: String,
          required:true
      },

      Mobile:{
          type: Number,
          required: true
      },

      DOB:{
          type: String,
          required: true
      },

      Password:{
          type:String,
          required: true
      },

      Gender:{
          type: String,
          required: true,
      },

     Skills:[String],

      Qualification:{
          type:String,
          required: false
      },

    

      Address:{
          type: String,
          required: true
      },

      City:{
          type: String,
          required: true
      },
      States:{
          type: String,
          required: true
      }, 

      Country:{
          type: String,
          required: true
      }
  })

  module.exports=mongoose.model("Users", UserSchema);

