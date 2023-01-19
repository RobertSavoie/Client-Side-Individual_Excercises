// noinspection DuplicatedCode

"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA  - Anonymous Self-Executing Function
(function(){

    // Paragraph creation using content injection
    let MainContent = document.getElementsByTagName("main")[0];
    let MainParagraph = document.createElement("p")
    MainParagraph.setAttribute("id", "MainParagraph")
    MainParagraph.setAttribute("class", "mt-3")
    MainParagraph.textContent = "This is the Main Paragraph!"
    MainContent.appendChild(MainParagraph);

    // Template strings
    let FirstString = "This is";
    let SecondString = `${FirstString} the Main Paragraph.`;
    MainParagraph.textContent = SecondString;

    // Create article
    let Article = document.createElement("article");
    let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my Article Paragraph</p>`;
    Article.setAttribute("class", "container")
    Article.innerHTML = ArticleParagraph;
    MainContent.appendChild(Article);

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

