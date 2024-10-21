import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    name: {type:String, require:true },
    email: {type:String, require:true, unique:true},
    username: {type:String, require:true, unique:true, lowercase:true},
    createDate:{type:Date, default: Date.now()}
});

export default model("user", UserSchema);