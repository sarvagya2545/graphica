//This File is part of testing



const mongoose=require("mongoose");
require('dotenv').config();
const Design = require('./models/Design.js')

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Mongodb Connection error', err));

//Create new design and call rating function
/*
  const design = new Design({
    designer:'60473987db784113505c757b',
  });

  design.save((err) =>{
    if(err){
        if(err.name === 'MongoError' && err.code === 11000){
            console.log('already exists');
        }else{
            console.log(err);
        }
    }else{
        console.log('success');
    }
  });
  Obj={
    id:'60473987db784113505c757b',
    rating:3,
  }
  design.rate(Obj);
  Obj={
    id:'6048a57f5cd14d7d3ceab9db',
    rating:9,
  }
  design.rate(Obj);
*/
//Fetch design and call rating
/*
Design.findById('6048ac9068a29c2fa0a4584e',function(err,design){
  if(!err){
    Obj={
      id:'60473987db784113505c757b',
      rating:12,
    }
    design.rate(Obj);
    Obj={
      id:'6048ade35cd14d7d3ceab9dd',
      rating:3,
    }
    design.rate(Obj);
    Design.updateOne( {_id:'6048ac9068a29c2fa0a4584e'},design,function(err,res){
      if(err){
        console.log(err);
      }
    });
  }else{
    console.log(err);
  }
  
});
*/
//Create new designs with tags
/*
const design = new Design({
  designer:'60473987db784113505c757b',
  tags: ['hello','world']
});

design.save((err) =>{
  if(err){
      if(err.name === 'MongoError' && err.code === 11000){
          console.log('already exists');
      }else{
          console.log(err);
      }
  }else{
      console.log('success');
  }
});

design.addTags(['goodbye','world','hola','water']);
*/
//Fetch design and call addTags
/*
Design.findById('6048bcaceca4081cccb65e4e',function(err,design){
  if(!err){
    design.addTags(['water','fire','earth','world','']);
    console.log(design);
    Design.updateOne( {_id:'6048bcaceca4081cccb65e4e'},design,function(err,res){
      if(err){
        console.log(err);
      }
    });
  }else{
    console.log(err);
  }
  
});
*/
/*
Design.find({tags:['hello','world']},function(err,res){
  if(err){
    console.log(err);
  }
  else{
    console.log(res);
  }
});
*/