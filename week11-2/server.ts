"use strict";

//IMPORTS
import express from 'express';
import path from 'path';

//VARIABLES
const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

//CONFIGURATIONS
app.use(router);
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

//STATIC CONFIGURATIONS
app.use(express.static(path.join(__dirname, "/client/")))

//MIDDLEWARE
app.use('/', function (req, res){
   res.send("Hello, World");
});


//LISTENER
app.listen(port, () => {
    console.log(`Server running at:${port}/`);
});

export default app;