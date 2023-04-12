"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
router.get('/', controller_1.DisplayHomePage);
router.get('/home', controller_1.DisplayHomePage);
router.get('/about', controller_1.DisplayAboutPage);
router.get('/products', controller_1.DisplayProductPage);
router.get('/services', controller_1.DisplayServicePage);
router.get('/contact', controller_1.DisplayContactPage);
exports.default = router;
//# sourceMappingURL=index.js.map