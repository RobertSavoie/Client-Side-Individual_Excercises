"use strict";


const fs = require('fs');

module.exports = function (){

    fs.readFile("./data/users.json", "utf-8", function (err, data){

        if(err){
            console.log(err.message);
        }
        console.log(data);

    });

}
