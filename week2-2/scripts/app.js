// noinspection DuplicatedCode

"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA  - Anonymous Self-Executing Function
(function(){
    function Start() {
        console.log("App Started!")
        switch(document.title)
        {
            case "Home":
                DisplayProductsPage();
                DisplayServicesPage();
                DisplayAboutUsPage();
                DisplayContactUsPage();
                break;
            case "Our Products":
                DisplayHomePage();
                break;
            case "Our Services":
                DisplayHomePage();
                break;
            case "About Us":
                DisplayHomePage();
                break;
            case "Contact Us":
                DisplayHomePage();
                break;
        }
    }
    function DisplayHomePage() {
        let HomeButton = document.getElementById("HomeBtn");
        HomeButton.addEventListener("click", function (){
            location.href = "index.html"
        });
    }
    function DisplayProductsPage() {
        let ProductsButton = document.getElementById("ProductsBtn");
        ProductsButton.addEventListener("click", function (){
           location.href = "products.html";
        });
    }
    function DisplayServicesPage() {
        let ServicesButton = document.getElementById("ServicesBtn");
        ServicesButton.addEventListener("click", function (){
           location.href = "services.html";
        });
    }
    function DisplayAboutUsPage() {
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function(){
            location.href = "about.html";
        });
    }
    function DisplayContactUsPage() {
        let ContactUsButton = document.getElementById("ContactUsBtn");
        ContactUsButton.addEventListener("click", function (){
           location.href = "contact.html"
        });
    }

    window.addEventListener("load", Start)

})();

