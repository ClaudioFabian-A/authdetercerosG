import userModel from "../models/user.js";


export default class UserManager {

    get = () => {
        return userModel.find().lean()
    };
    getBy = (param) => {
        return userModel.findOne(param).lean()
    };
    create = (param) => {
        return userModel.create(param)
    };
    updateOne = (param) => {
        return userModel.updateOne(param)
    };
    delete = (param) => {
        return userModel.deleteOne(param)
    };
}