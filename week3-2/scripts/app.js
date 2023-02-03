"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA  - Anonymous Self-Executing Function
(function(){

    function Start() {
        console.log("App Started!")
        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Contact Us":
                DisplayContactUsPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
        }
    }
    window.addEventListener("load", Start)

    function DisplayHomePage() {
        console.log("Home Page")
        let ProductsButton = document.getElementById("ProductsBtn");
        ProductsButton.addEventListener("click", function (){
            location.href = "products.html";
        });
        let ServicesButton = document.getElementById("ServicesBtn");
        ServicesButton.addEventListener("click", function (){
            location.href = "services.html";
        });
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function(){
            location.href = "about.html";
        });
        let ContactUsButton = document.getElementById("ContactUsBtn");
        ContactUsButton.addEventListener("click", function (){
            location.href = "contact.html"
        });

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
    }
    function DisplayProductsPage() {
        console.log("Products Page")
        let HomeButton = document.getElementById("HomeBtn");
        HomeButton.addEventListener("click", function (){
            location.href = "index.html";
        });
    }
    function DisplayServicesPage() {
        console.log("Services Page")
        let HomeButton = document.getElementById("HomeBtn");
        HomeButton.addEventListener("click", function (){
            location.href = "index.html";
        });
    }
    function DisplayAboutUsPage() {
        console.log("About Us Page")
        let HomeButton = document.getElementById("HomeBtn");
        HomeButton.addEventListener("click", function (){
            location.href = "index.html";
        });
    }
    function DisplayContactUsPage() {
        console.log("Contact Us Page")
        let HomeButton = document.getElementById("HomeBtn");
        HomeButton.addEventListener("click", function (){
            location.href = "index.html";
        });
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscriptionCheckbox");
        sendButton.addEventListener("click", function(event){
            if(subscribeCheckbox.checked){
                console.log("Checkbox checked!")
                let contact = new Contact(document.getElementById("fullName").value,
                                        document.getElementById("contactNumber").value,
                                        document.getElementById("email").value,
                                        document.getElementById("message").value);
                if(contact.serialize()){
                    let key = contact.FullName.substring(0,1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
            location.href = "contact-list.html";
        });
    }
    function DisplayContactListPage(){
        console.log("Contact List Page")
        let HomeButton = document.getElementById("HomeBtn");
        HomeButton.addEventListener("click", function (){
            location.href = "index.html";
        });

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";
            // Add deserialized data from localStorage
            let keys = Object.keys(localStorage);
            // return a string array of keys
            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         <td>${contact.Message}</td>
                         <td></td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }
    }
})();

