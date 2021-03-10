const mongoose=require('mongoose');
const Float=require('mongoose-float').loadType(mongoose);
const User=require('./User.js');

const designSchema = new mongoose.Schema({
    designer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    currentRating: {
        type: Float,
        default: 0,
    },
    numberOfRatings: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
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
});

designSchema.methods.rate = function( Obj ){
    if(Obj.id==this.designer){
        console.log("Designer cant rate");
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

designSchema.methods.addTags = function ( tagsArr ){
    this.tags.forEach(tag=>{
        tagsArr.push(tag);
    });
    var temp= new Set(tagsArr);
    this.tags=[];
    temp.forEach(tag=>{
        this.tags.push(tag);
        console.log(this.tags);
    })
}

const Design = mongoose.model( 'design' , designSchema );
module.exports = Design;