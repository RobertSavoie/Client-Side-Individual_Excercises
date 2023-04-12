"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_1 = __importDefault(require("../models/contact"));
const user_1 = __importDefault(require("../models/user"));
const passport_1 = __importDefault(require("passport"));
const util_1 = require("../util");
const router = express_1.default.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/about', function (req, res, next) {
    res.render('index', { title: 'About Us', page: 'about', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/products', function (req, res, next) {
    res.render('index', { title: 'Products', page: 'products', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: (0, util_1.UserDisplayName)(req) });
});
router.get('/login', function (req, res, next) {
    if (!req.user) {
        return res.render('index', {
            title: 'Login', page: 'login',
            messages: req.flash('loginMessage'), displayName: (0, util_1.UserDisplayName)(req)
        });
    }
    return res.redirect('/contact-list');
});
router.post('/login', function (req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        if (!user) {
            req.flash('login', 'Authentication Error');
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.redirect('/contact-list');
        });
    })(req, res, next);
});
router.get('/register', function (req, res, next) {
    if (!req.user) {
        return res.render('index', {
            title: 'Register', page: 'register',
            messages: req.flash('registerMessage'), displayName: (0, util_1.UserDisplayName)(req)
        });
    }
    return res.redirect('/contact-list');
});
router.post('/register', function (req, res, next0) {
    let newUser = new user_1.default({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
                req.flash('registerMessage', "Registration Error");
                res.redirect('/register');
            }
            console.error('Error: Server Error');
            req.flash('registerMessage', "Server Error");
            res.redirect('/register');
        }
        return passport_1.default.authenticate('local')(req, res, function () {
            return res.redirect('/contact-list');
        });
    });
});
router.get('/logout', function (req, res, next) {
    req.logOut(function (err) {
        if (err) {
            console.error(err);
            res.end();
        }
        return res.redirect('/login');
    });
});
router.get('/contact-list', util_1.AuthGuard, function (req, res, next) {
    contact_1.default.find().then(function (data) {
        res.render('index', {
            title: 'Contact List', page: 'contact-list',
            contacts: data, displayName: (0, util_1.UserDisplayName)(req)
        });
    }).catch(function (err) {
        console.error("Encountered an Error reading from the Database: " + err);
        res.end();
    });
});
router.get('/add', util_1.AuthGuard, function (req, res, next) {
    res.render('index', {
        title: 'Add Contact', page: 'edit',
        contact: '', displayName: (0, util_1.UserDisplayName)(req)
    });
});
router.post('/add', util_1.AuthGuard, function (req, res, next) {
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
});
router.get('/delete/:id', util_1.AuthGuard, function (req, res, next) {
    let id = req.params.id;
    contact_1.default.deleteOne({ _id: id }).then(function (contactToEdit) {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error("Failed to delete contact from database " + err);
        res.end();
    });
});
router.get('/edit/:id', util_1.AuthGuard, function (req, res, next) {
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
});
router.post('/edit/:id', util_1.AuthGuard, function (req, res, next) {
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
});
exports.default = router;
//# sourceMappingURL=index.js.map