"use strict";
(function () {
    function AuthGuard() {
        let protected_routes = ["contact-list, edit"];
        if (protected_routes.indexOf(location.pathname) > -1) {
            if (!sessionStorage.getItem("user")) {
                location.href = "/login";
            }
        }
    }
    function DisplayHomePage() {
        console.log("Home Page");
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph!</p>`);
        $("main").append(`<article>
                        <p id="ArticleParagraph" class="mt-3">This is my Article Paragraph</p>
                        </article>`);
    }
    function DisplayProductsPage() {
        console.log("Products Page");
    }
    function DisplayServicesPage() {
        console.log("Services Page");
    }
    function DisplayAboutUsPage() {
        console.log("About Us Page");
    }
    function AddContact(fullName, contactNumber, emailAddress, message) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress, message);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ValidateField(inputFieldID, regularExpression, errorMessage) {
        let messageArea = $("#messageArea");
        $(inputFieldID).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regularExpression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(errorMessage).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/, "Please enter a valid first and last name (ex. Mr. Peter Parker)");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid phone number (ex. 555 555-5555");
        ValidateField("#email", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address (ex. example@email.com");
    }
    function DisplayContactPage() {
        console.log("Contact Us Page");
        ContactFormValidation();
        let sendButton = document.getElementById("SendBtn");
        let subscribeCheckbox = document.getElementById("subscriptionCheckbox");
        sendButton.addEventListener("click", function (event) {
            if (subscribeCheckbox.checked) {
                console.log("Checkbox checked!");
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].email.value;
                let message = document.forms[0].message.value;
                let contact = new core.Contact(fullName, contactNumber, emailAddress, message);
                if (contact.serialize()) {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Contact List Page");
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure you want to delete this contact?")) {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    function DisplayEditPage() {
        console.log("Edit Contact Page");
        ContactFormValidation();
    }
    function DisplayLoginPage() {
        console.log("Display Login Page");
    }
    function DisplayRegisterPage() {
        console.log("Display Register Page");
    }
    function Display404Page() {
        console.log("Displaying 404 Page");
    }
    function Start() {
        console.log("App Started!");
        let page_id = $("body")[0].getAttribute("id");
        switch (page_id) {
            case "home":
                DisplayHomePage();
                break;
            case "about":
                DisplayAboutUsPage();
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
                DisplayContactListPage();
                break;
            case "add":
                DisplayEditPage();
                break;
            case "edit":
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
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map