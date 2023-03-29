"use strict";

import ClickEvent = JQuery.ClickEvent;

(function(){

    function AuthGuard() : void {

        let protected_routes : string[] = ["contact-list, edit"];

        if(protected_routes.indexOf(location.pathname) > -1){
            if(!sessionStorage.getItem("user")){
                location.href = "/login";
            }
        }
    }

    function DisplayHomePage() : void {
        console.log("Home Page")

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph!</p>`);

        $("main").append(`<article>
                        <p id="ArticleParagraph" class="mt-3">This is my Article Paragraph</p>
                        </article>`);
    }

    function DisplayProductsPage() : void {
        console.log("Products Page")
    }
    function DisplayServicesPage() : void {
        console.log("Services Page")
    }
    function DisplayAboutUsPage() : void {
        console.log("About Us Page")
    }

    function AddContact(fullName : string, contactNumber : string, emailAddress : string, message : string) : void {
        let contact = new core.Contact(fullName, contactNumber, emailAddress, message);
        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    function ValidateField(inputFieldID : string, regularExpression : RegExp, errorMessage : string) : void {
        let messageArea = $("#messageArea");

        $(inputFieldID).on("blur", function(){

            let inputFieldText = $(this).val() as string;
            if(!regularExpression.test(inputFieldText)){
                // fail validation
                $(this).trigger("focus").trigger("select"); // go back to the fullName text
                messageArea.addClass("alert alert-danger").text(errorMessage).show();
            }else{
                //pass validation
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation() : void {
        // Validate full name
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/,
            "Please enter a valid first and last name (ex. Mr. Peter Parker)");
        // Validate Phone Number
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone number (ex. 555 555-5555");
        // Validate Email Address
        ValidateField("#email",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address (ex. example@email.com");
    }

    function DisplayContactPage() : void {
        console.log("Contact Us Page")

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function (){
           location.href = "/contact-list";
        });

        ContactFormValidation();

        let sendButton = document.getElementById("SendBtn") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscriptionCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function(event : MouseEvent){

            if(subscribeCheckbox.checked){
                console.log("Checkbox checked!")

                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let message = document.forms[0].message.value;

                let contact = new core.Contact(fullName, contactNumber, emailAddress, message);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();

                    localStorage.setItem(key, contact.serialize() as string);
                }
            }
        });
    }
    function DisplayContactListPage() : void {
        console.log("Contact List Page")

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList") as HTMLElement;

            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;

            for(const key of keys){
                let contactData = localStorage.getItem(key) as string;

                let contact = new core.Contact();
                contact.deserialize(contactData);

                data += `<tr>
                         <th scope="row" class="text-center">${index}</th>
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

            $("#AddBtn").on("click", () => {
                location.href = "/edit#add";
            });

            $("button.delete").on("click", function () {
                if(confirm("Are you sure you want to delete this contact?")){
                    localStorage.removeItem($(this).val() as string);
                }
                location.href = "/contact-list";
            });

            $("button.edit").on("click", function () {
                location.href = "/edit" + $(this).val() as string;
            });
        }
    }

    function DisplayEditPage() : void {
        console.log("Edit Contact Page")

        ContactFormValidation();

        let page : string = location.hash.substring(1) as string;

        switch(page){
            case "add" : {
                $("main>h1").text("Add Contact");

                $("#EditBtn").html(`<i class="fas fa-plus fa-sm"></i> Add`);

                $("#EditBtn").on("click", (event : ClickEvent) => {
                    event.preventDefault();

                    let fullName = document.forms[0].fullName.value;
                    let contactNumber = document.forms[0].contactNumber.value;
                    let emailAddress = document.forms[0].emailAddress.value;
                    let message = document.forms[0].message.value;

                    AddContact(fullName, contactNumber, emailAddress, message);
                    location.href = "/contact-list";
                });

                $("#CancelBtn").on("click", () => {
                    location.href = "/contact-list";
                });
            }
            break;
        default : {
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page) as string);

                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#email").val(contact.EmailAddress);
                $("#message").val(contact.Message);

                $("#EditBtn").on("click", (event) => {

                    event.preventDefault();

                    contact.FullName = $("#fullName").val() as string;
                    contact.ContactNumber = $("#contactNumber").val() as string;
                    contact.EmailAddress = $("#email").val() as string;
                    contact.Message = $("#message").val() as string;

                    localStorage.setItem(page, contact.serialize() as string);

                    location.href = "/contact-list";
                });
                $("#CancelBtn").on("click", () => {
                    location.href = "/contact-list";
                });
            }
            break;
        }
    }

    function CheckLogin() : void {

        if(sessionStorage.getItem("user")){

            $("#login").html(`<a id="logout" class="nav-link" href="#">
                            <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`);

            $("#logout").on("click", function(){
                sessionStorage.clear();

                $("#login").html(
                    `<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`
                );

                location.href = "/login";
            })
        }
    }

    function DisplayLoginPage() : void {
        console.log("Display Login Page");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginBtn").on("click", function(){

            let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function(data){

                for(const u of data.users){

                    let userName = document.forms[0].userName.value;
                    let password = document.forms[0].password.value;

                    if(userName === u.Username && password === u.Password){
                        console.log("success");
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    location.href = "/contact-list";
                }
                else{
                    $("#userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Failed to authenticate");
                }

            });

        });

        $("#cancelBtn").on("click", function(){
            document.forms[0].reset();
            location.href = "/home";
        })
    }
    function DisplayRegisterPage() : void {
        console.log("Display Register Page")

        $("#cancelBtn").on("click", function(){
            document.forms[0].reset();
            location.href = "/register";
        })
    }

    function Display404Page() : void {
        console.log("Displaying 404 Page")
    }

    function Start() : void {
        console.log("App Started!");

        let page_id = $("body")[0].getAttribute("id");

        CheckLogin();

        switch(page_id)
        {
            case "home":
                DisplayHomePage();
                break;
            case "about":
                DisplayAboutUsPage()
                break;
            case "products":
                DisplayProductsPage();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "contact-list":
                AuthGuard();
                DisplayContactListPage();
                break;
            case "edit":
                AuthGuard();
                DisplayEditPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "404":
                Display404Page();
                break;
        }
    }

    window.addEventListener("load", Start)

})();