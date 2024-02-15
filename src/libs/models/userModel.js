import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    
    name: String,
    username: String,
    email: String,
    password: String,
    verify_token: String,

    isVerified: {
        type: Boolean,
        default: false,
    },

    profilePicture: {
        type: String,
    },

    coverPicture: {
        type: String,
    },

    blankPicture: {
        type: String,
    },

    following: [
        {
            userId: String,
            username: String,
            userImg: String,
        },
    ],
})

const Users = models.user || model('user', userSchema);

export default Users;