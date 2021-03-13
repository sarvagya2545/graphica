const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Float = require('mongoose-float');

const designerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
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
          ref: 'Customer',
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

const Designer = mongoose.model('designer', designerSchema);

module.exports = Designer;