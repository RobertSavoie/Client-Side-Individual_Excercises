import express from 'express';
import {AuthGuard, UserDisplayName} from "../util";
import {
    DisplayAddPage,
    DisplayContactList,
    DisplayEditPage,
    ProcessAddPage,
    ProcessDelete, ProcessEditPage
} from "../controller/contact-list";

const router = express.Router();

/***************** CONTACT LIST ROUTES ****************/
router.get('/contact-list', AuthGuard, DisplayContactList);

router.get('/add', AuthGuard, DisplayAddPage);

router.post('/add', AuthGuard, ProcessAddPage);

router.get('/delete/:id', AuthGuard, ProcessDelete);

router.get('/edit/:id', AuthGuard, DisplayEditPage);

router.post('/edit/:id', AuthGuard, ProcessEditPage);

export default router;