import express from 'express';
import Contact from "../models/contact";
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Us', page: 'about', displayName: '' });
});

router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products', page: 'products', displayName: '' });
});

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Our Services', page: 'services', displayName: '' });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page: 'contact', displayName: '' });
});

router.get('/contact-list', function(req, res, next) {
  Contact.find().then(function(contacts){
    console.log(contacts);
  }).catch(function(err){
    console.error("Encountered an Error reading from the Database: " + err);
    res.end();
  });
  res.render('index', { title: 'Contact List', page: 'contact-list', displayName: '' });
});

router.get('/edit', function(req, res, next) {
  res.render('index', { title: 'Edit Contacts', page: 'edit', displayName: '' });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login Page', page: 'login', displayName: '' });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register Page', page: 'register', displayName: '' });
});

export default router;
