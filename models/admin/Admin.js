const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{ __v: { type: Number, select: false}});

AdminSchema.pre('save', function(next) {
    const admin = this;
    if(!admin.isModified || !admin.isNew){
        next();
    }else{
        bcrypt.hash(admin.password, 10, function(err, hash){
            if(err) {
                console.log('Error hashing password for admin', admin.first_name);
                next(err);
            }
            else{
                admin.password = hash;
                next();
            }
        })
    }
});

AdminSchema.pre('findOneAndUpdate', async function(next) {
    try {
        if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 10)
            this._update.password = hashed;
        }
        next();
    } catch (err) {
        return next(err);
    }

});
AdminSchema.plugin(timestamps,{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

AdminSchema.plugin(mongoosePaginate);

mongoose.models = {}
const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;