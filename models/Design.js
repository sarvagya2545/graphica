const mongoose=require('mongoose');
const Float=require('mongoose-float').loadType(mongoose,2);
const Designer=require('./Designer');

const designSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designer',
        required: true,
    },
    currentRating: {
        type: Float,
        default: 4.00,
        min: 1.00,
        max: 5.00
    },
    numberOfRatings: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: []
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
    price: {
        type: Float,
        required: true,
    },
    assets: {
        type: [
            {
                type: String,
            }
        ],
        default: []
    }
});

designSchema.methods.rate = function( Obj ){
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

designSchema.methods.addTags = function ( tagsArr ){
    this.tags.forEach(tag=>{
        tagsArr.push(tag);
    });
    var temp= new Set(tagsArr);
    this.tags=[];
    temp.forEach(tag=>{
        this.tags.push(tag);
    })
}

const Design = mongoose.model( 'design' , designSchema );
module.exports = Design;