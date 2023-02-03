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
            event.preventDefault();
            if(subscribeCheckbox.checked){
                console.log("Checkbox checked!")
                AddContact(document.getElementById("fullName").value,
                           document.getElementById("contactNumber").value,
                           document.getElementById("email").value,
                           document.getElementById("message").value);
                location.href = "contact-list.html";
            }
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
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         <td>${contact.Message}</td>                         
                         <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                            <i class="fa-solid fa-edit fa-sm"></i> Edit
                            </button>
                         </td>
                         <td>
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                            <i class="fa-regular fa-trash-alt fa-sm"></i> Delete
                            </button>
                         </td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;
            $("#AddBtn").on("click", () => {location.href = "edit.html#add";});
            $("button.delete").on("click", function () {
                if(confirm("Are you sure you want to delete this contact?")){
                    localStorage.removeItem($(this).val());
                    location.href = "contact-list.html";
                }
            });
            $("button.edit").on("click", function () {
                location.href = "edit.html#" + $(this).val();

            });
        }
    }
    function DisplayEditContactPage(){
        console.log("Edit Contact Page")

        let page = location.hash.substring(1);
        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#EditBtn").html(`<i class="fas fa-plus fa-sm"></i> Add`);

                $("#EditBtn").on("click", (event) => {
                    event.preventDefault();
                    AddContact(document.getElementById("fullName").value,
                               document.getElementById("contactNumber").value,
                               document.getElementById("email").value,
                               document.getElementById("message").value);
                    location.href = "contact-list.html";
                });

                $("#CancelBtn").on("click", () => {location.href = "contact-list.html";});
                break;
            default:{
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#email").val(contact.EmailAddress);
                $("#message").val(contact.Message);
                $("#EditBtn").on("click", (event) => {
                    event.preventDefault();

                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#email").val();
                    contact.Message = $("#message").val();

                    localStorage.setItem(page, contact.serialize());

                    location.href = "contact-list.html";
                });
                $("#CancelBtn").on("click", () => {location.href = "contact-list.html";});
                break;
            }
        }

        Buttons();
    }
    function Buttons(){
        $("#HomeBtn").on("click", () => {location.href = "index.html";});
        $("#ProductsBtn").on("click", () => {location.href = "products.html";});
        $("#ServicesBtn").on("click", () => {location.href = "services.html";});
        $("#AboutUsBtn").on("click", () => {location.href = "about.html";});
        $("#ContactUsBtn").on("click", () => {location.href = "contact.html";});
    }

    /**
     * Creates a contact from the given parameters
     * @param {string}fullName
     * @param {string}contactNumner
     * @param {string}emailAddress
     * @param {string}message
     */
    function AddContact(fullName, contactNumner, emailAddress, message){
        let contact = new core.Contact(fullName, contactNumner, emailAddress, message);
        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
})();

