"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const util_1 = require("../util");
const contact_list_1 = require("../controller/contact-list");
const router = express_1.default.Router();
router.get('/contact-list', util_1.AuthGuard, contact_list_1.DisplayContactList);
router.get('/add', util_1.AuthGuard, contact_list_1.DisplayAddPage);
router.post('/add', util_1.AuthGuard, contact_list_1.ProcessAddPage);
router.get('/delete/:id', util_1.AuthGuard, contact_list_1.ProcessDelete);
router.get('/edit/:id', util_1.AuthGuard, contact_list_1.DisplayEditPage);
router.post('/edit/:id', util_1.AuthGuard, contact_list_1.ProcessEditPage);
exports.default = router;
//# sourceMappingURL=contact-list.js.map