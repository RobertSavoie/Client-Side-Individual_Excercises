import mongoose, {Schema} from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema : any = new mongoose.Schema(
    {
        DisplayName : String,
        EmailAddress : String,
        Username : String,
        Created : {
            type : Date,
            default : Date.now()
        },
        Updated : {
            type : Date,
            default : Date.now()
        }
    },
    {
        collection: "users"
    }
);

UserSchema.plugin(passportLocalMongoose);

const Model = mongoose.model("User", UserSchema);

declare global{
    export type UserDocument = mongoose.Document &
        {
            username : String,
            EmailAddress : String,
            DisplayName : String
        }
}
export default Model;