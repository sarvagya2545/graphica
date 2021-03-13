const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { Schema } = require("mongoose");
const Design = require('./Design.js');
const Float = require('mongoose-float');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Design',
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
    /*role: {
      type: String,
      enum: ['Customer', 'Designer', 'Admin'],
      default: 'Customer'
    }*/
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

customerSchema.methods.isValidPassword = async function (password) {
  // this points to User model
  try {
      return await bcrypt.compare(password, this.auth.local.password);
  } catch(err) {
      throw new Error(err);
  }
}

customerSchema.methods.rate = function( Obj ){
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

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;