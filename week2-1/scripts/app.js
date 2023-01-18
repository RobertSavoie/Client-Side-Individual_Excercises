"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA  - Anonymous Self-Executing Function
(function(){
    function Start() {
        console.log("App Started!")
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
    window.addEventListener("click", function (){
        if (document.title !== "Home"){
            DisplayHomePage();
        }
    })
    window.addEventListener("click", function(){
        if (document.title === "Home"){
            DisplayProductsPage();
        }
    })
    window.addEventListener("click", function(){
        if (document.title === "Home"){
            DisplayServicesPage();
        }
    })
    window.addEventListener("click", function(){
       if (document.title === "Home"){
           DisplayAboutUsPage();
       }
    })
    window.addEventListener("click", function(){
        if (document.title === "Home"){
            DisplayContactUsPage();
        }
    })

})();

