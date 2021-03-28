import mongoose from 'mongoose';

export default function initDB(){
    if(mongoose.connections[0].readyState){console.log('Already Connected'); return;}
    const uri = process.env.MONGO_URI;
    mongoose
     .connect( uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
}