import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    username : String,
    email: String,
    password: String,
    verify_token: String,

    profilePicture: {
        type: String,
        default: '/images/blank-profile-picture.webp',
    },
})

const Users = models.user || model('user', userSchema);

export default Users;