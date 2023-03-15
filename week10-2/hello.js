"use strict";

const helloMessage = "Hello, World!";
const goodByeMessage = "Good Bye";

module.exports = {

    sayHello : function (){
        console.log(helloMessage);
    },

    sayGoodBye : function (){
        console.log(goodByeMessage);
    }
};