import express from 'express';
import {
    DisplayLoginPage,
    DisplayRegisterPage,
    ProcessLoginPage,
    ProcessLogoutPage,
    ProcessRegisterPage
} from "../controller/auth";

const router = express.Router();

/***************** AUTHENTICATION ROUTES **************/
router.get('/login', DisplayLoginPage);

router.post('/login', ProcessLoginPage);

router.get('/register', DisplayRegisterPage);

router.post('/register', ProcessRegisterPage);

router.get('/logout', ProcessLogoutPage);

export default router;