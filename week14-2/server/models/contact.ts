import mongoose, {Schema} from "mongoose";

const ContactSchema : any = new mongoose.Schema(
    {
        DisplayName : String,
        ContactNumber : String,
        EmailAddress : String
    },
    {
        collection: "contacts"
    }
);

const Model = mongoose.model("Contact", ContactSchema);
export default Model;