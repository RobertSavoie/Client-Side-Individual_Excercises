"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(router);
app.set("views", path_1.default.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, "/client/")));
app.use('/', function (req, res) {
    res.send("Hello, World");
});
app.listen(port, () => {
    console.log(`Server running at:${port}/`);
});
exports.default = app;
//# sourceMappingURL=server.js.map