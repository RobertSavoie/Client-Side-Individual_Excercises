"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessEditPage = exports.DisplayEditPage = exports.ProcessDelete = exports.ProcessAddPage = exports.DisplayAddPage = exports.DisplayContactList = void 0;
const util_1 = require("../util");
const contact_1 = __importDefault(require("../models/contact"));
function DisplayContactList(req, res, next) {
    contact_1.default.find().then(function (data) {
        res.render('index', {
            title: 'Contact List', page: 'contact-list',
            contacts: data, displayName: (0, util_1.UserDisplayName)(req)
        });
    }).catch(function (err) {
        console.error("Encountered an Error reading from the Database: " + err);
        res.end();
    });
}
exports.DisplayContactList = DisplayContactList;
function DisplayAddPage(req, res, next) {
    res.render('index', {
        title: 'Add Contact', page: 'edit',
        contact: '', displayName: (0, util_1.UserDisplayName)(req)
    });
}
exports.DisplayAddPage = DisplayAddPage;
function ProcessAddPage(req, res, next) {
    let newContact = new contact_1.default({
        "DisplayName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.email
    });
    contact_1.default.create(newContact).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error("Failed to add contact " + err);
        res.end(err);
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessDelete(req, res, next) {
    let id = req.params.id;
    contact_1.default.deleteOne({ _id: id }).then(function (contactToEdit) {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error("Failed to delete contact from database " + err);
        res.end();
    });
}
exports.ProcessDelete = ProcessDelete;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id).then(function (contactToEdit) {
        res.render('index', {
            title: 'Edit Contacts', page: 'edit',
            contact: contactToEdit, displayName: (0, util_1.UserDisplayName)(req)
        });
    }).catch(function (err) {
        console.error("Failed to retrieve contact from database " + err);
        res.end();
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedContact = new contact_1.default({
        "_id": id,
        "DisplayName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.email
    });
    contact_1.default.updateOne({ _id: id }, updatedContact).then(function (contactToEdit) {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error("Failed to edit contact " + err);
        res.end(err);
    });
}
exports.ProcessEditPage = ProcessEditPage;
//# sourceMappingURL=contact-list.js.map