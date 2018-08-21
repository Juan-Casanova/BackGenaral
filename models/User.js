const passportLocalMongoose = require('passport-local-mongoose');
const Schema = require('mongoose').Schema;
const userSchema = new require('mongoose').Schema({
    username: String,
    photoURL: String,
    email: String,
    //facebookId:String,
    role:{
        type: String,
        enum: ['USER', 'EDITOR'],
        default: 'USER'
    },
    products:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    password:{
        require:true,
        type:String
    }
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.plugin(passportLocalMongoose, {username:'email'})

module.exports = require('mongoose').model('User', userSchema);