"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ContactSchema = new mongoose_1.default.Schema({
    DisplayName: String,
    ContactNumber: String,
    EmailAddress: String
}, {
    collection: "contacts"
});
const Model = mongoose_1.default.model("Contact", ContactSchema);
exports.default = Model;
//# sourceMappingURL=contact.js.map