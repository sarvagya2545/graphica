const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { Schema } = require("mongoose");
const Design = require('./Design');
const User=require('./User');
const Float = require('mongoose-float');

const designerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  balance: {
    type: Number,
    default: 0,
  },
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
    username: {
      type: String,
      required: true
    },
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

designerSchema.methods.isValidPassword = async function (password) {
  // this points to User model
  try {
      return await bcrypt.compare(password, this.auth.local.password);
  } catch(err) {
      throw new Error(err);
  }
}

designerSchema.methods.rate = function( Obj ){
  if( this.ratedBy.some( user => user.id == Obj.id )){
      let ratedByObj = this.ratedBy.find( user => user.id == Obj.id );
      this.currentRating = ( this.numberOfRatings*this.currentRating + Obj.rating - ratedByObj.rating )/(this.numberOfRatings);
      ratedByObj.rating=Obj.rating;
  }
  else{
      this.currentRating = ( Obj.rating + this.numberOfRatings * this.currentRating )/( this.numberOfRatings + 1 );
      this.numberOfRatings++;
      this.ratedBy.push( Obj );
  }
}

const Designer = mongoose.model('designer', designerSchema);

module.exports = Designer;