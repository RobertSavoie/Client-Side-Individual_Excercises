"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA  - Anonymous Self-Executing Function
(function(){
    function Start()
    {
        console.log("App Started!")
    }
    window.addEventListener("load", Start)
})();

function DisplayHomePage(){
    let AboutUsButton = document.getElementById("AboutUsBtn");
    AboutUsButton.addEventListener("click", function ()
    {
        console.log("About Us Button Clicked");
    });
}