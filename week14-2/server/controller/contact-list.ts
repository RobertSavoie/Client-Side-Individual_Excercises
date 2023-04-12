import express, {Request, Response, NextFunction} from "express";
import {UserDisplayName} from "../util";
import Contact from "../models/contact";

export function DisplayContactList(req: Request, res: Response, next: NextFunction): void {
    Contact.find().then(function (data) {
        // console.log(data);
        res.render('index', {
            title: 'Contact List', page: 'contact-list',
            contacts: data, displayName: UserDisplayName(req)
        });
    }).catch(function (err) {
        console.error("Encountered an Error reading from the Database: " + err);
        res.end();
    });
}

export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void {
    res.render('index', {
        title: 'Add Contact', page: 'edit',
        contact: '', displayName: UserDisplayName(req)
    });
}

export function ProcessAddPage(req: Request, res: Response, next: NextFunction): void {
    let newContact = new Contact(
        {
            "DisplayName": req.body.fullName,
            "ContactNumber": req.body.contactNumber,
            "EmailAddress": req.body.email
        }
    );

    Contact.create(newContact).then(function () {
        res.redirect('/contact-list');

    }).catch(function (err) {
        console.error("Failed to add contact " + err);
        res.end(err);
    });
}

export function ProcessDelete(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    Contact.deleteOne({_id: id}).then(function (contactToEdit) {

        res.redirect('/contact-list');

    }).catch(function (err) {
        console.error("Failed to delete contact from database " + err);
        res.end();
    });
}

export function DisplayEditPage(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    Contact.findById(id).then(function (contactToEdit) {

        res.render('index', {
            title: 'Edit Contacts', page: 'edit',
            contact: contactToEdit, displayName: UserDisplayName(req)
        });

    }).catch(function (err) {
        console.error("Failed to retrieve contact from database " + err);
        res.end();
    });
}

export function ProcessEditPage(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    let updatedContact = new Contact(
        {
            "_id": id,
            "DisplayName": req.body.fullName,
            "ContactNumber": req.body.contactNumber,
            "EmailAddress": req.body.email
        },
    );

    Contact.updateOne({_id: id}, updatedContact).then(function (contactToEdit) {
        res.redirect('/contact-list');

    }).catch(function (err) {
        console.error("Failed to edit contact " + err);
        res.end(err);
    });
}