const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { Schema } = require("mongoose");
const Design = require('./Design.js');
const Float = require('mongoose-float');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Design',
  }],
  currentRating: {
    type: Float,
    default: 0,
  },
  numberOfRatings: {
      type: Number,
      default: 0,
  },
  ratedBy: [{
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
      },
      rating: {
          type:Float,
          required: true,
      },
  }],
  description: {
    type: String,
  },
  config: {
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true,
    },
  },
  auth: {
    email: {
      type: String,
      required: true,
    },
    local: {
      password: {
        type: String,
      },
    },
    google: {
      id: {
        type: String,
      },
    },
  },
});

userSchema.methods.isValidPassword = async function (password) {
  // this points to User model
  try {
      return await bcrypt.compare(password, this.auth.local.password);
  } catch(err) {
      throw new Error(err);
  }
}

userSchema.methods.rate = function( Obj ){
  if(Obj.id==this._id){
      console.log("Designer cant self rate");
  }
  else if( this.ratedBy.some( users => users.id == Obj.id )){
      let ratedByObj = this.ratedBy.find( users => users.id == Obj.id );
      this.currentRating = ( this.numberOfRatings*this.currentRating + Obj.rating - ratedByObj.rating )/(this.numberOfRatings);
      ratedByObj.rating=Obj.rating;
  }
  else{
      this.currentRating = ( Obj.rating + this.numberOfRatings * this.currentRating )/( this.numberOfRatings + 1 );
      this.numberOfRatings++;
      this.ratedBy.push( Obj );
  }
}

const User = mongoose.model('user', userSchema);

module.exports = User;