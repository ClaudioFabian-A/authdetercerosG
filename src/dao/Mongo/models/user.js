import mongoose from "mongoose";


const Collection = "users";

const Schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    password: String,
    role: {
        type: String,
        enum: ['user', 'premium'],
        default: 'user'
    }
})

const userModel = mongoose.model(Collection, Schema);

export default userModel;
