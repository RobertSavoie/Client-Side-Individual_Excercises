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
            case "Edit Contact":
                DisplayEditContactPage();
                break;
        }
    }
    window.addEventListener("load", Start)

    function DisplayHomePage() {
        console.log("Home Page")
        $("#ProductsBtn").on("click", () => {location.href = "products.html";});
        $("#ServicesBtn").on("click", () => {location.href = "services.html";});
        $("#AboutUsBtn").on("click", () => {location.href = "about.html";});
        $("#ContactUsBtn").on("click", () => {location.href = "contact.html";});

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph!</p>`)

        $("body").append(`<article class="container">
                        <p id="ArticleParagraph" class="mt-3">This is my Article Paragraph</p></article>`)
    }
    function DisplayProductsPage() {
        console.log("Products Page")
        Buttons();
    }
    function DisplayServicesPage() {
        console.log("Services Page")
        Buttons();
    }
    function DisplayAboutUsPage() {
        console.log("About Us Page")
        Buttons();
    }
    function DisplayContactUsPage() {
        console.log("Contact Us Page")
        Buttons();
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
        Buttons();

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
    function DisplayEditContactPage(){
        console.log("Edit Contact Page")
        Buttons();
    }
    function Buttons(){
        $("#HomeBtn").on("click", () => {location.href = "index.html";});
        $("#ProductsBtn").on("click", () => {location.href = "products.html";});
        $("#ServicesBtn").on("click", () => {location.href = "services.html";});
        $("#AboutUsBtn").on("click", () => {location.href = "about.html";});
        $("#ContactUsBtn").on("click", () => {location.href = "contact.html";});
    }
})();

