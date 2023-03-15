"use strict";

import ClickEvent = JQuery.ClickEvent;

(function(){

    function AuthGuard() : void {

        let protected_routes : string[] = ["contact-list"];

        if(protected_routes.indexOf(router.ActiveLink) > -1){
            if(!sessionStorage.getItem("user")){
                router.ActiveLink = "login";
            }
        }
    }

    function LoadLink(link : string, data : string = "") : void {

        router.ActiveLink = link;

        AuthGuard();

        router.LinkData = data;

        history.pushState({}, "", router.ActiveLink);

        document.title = router.ActiveLink.substring(0, 1).toUpperCase() + router.ActiveLink.substring(1);

        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });

        $(`li>a:contains(${document.title})`).addClass("active");

        CheckLogin();

        LoadContent();
    }

    function AddNavigationEvents(): void
    {

        let NavLinks = $("ul>li>a"); // find all Navigation Links

        NavLinks.off("click");
        NavLinks.off("mouseover");

        // loop through each Navigation link and load appropriate content on click
        NavLinks.on("click", function()
        {
            LoadLink($(this).attr("data") as string);
        });

        NavLinks.on("mouseover", function()
        {
            $(this).css("cursor", "pointer");
        });
    }

    function AddLinkEvents(link: string): void
    {
        let linkQuery = $(`a.link[data=${link}]`);
        // remove all link events
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");

        // css adjustments for links
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");

        // add link events
        linkQuery.on("click", function()
        {
            LoadLink(`${link}`);
        });

        linkQuery.on("mouseover", function()
        {
            $(this).css('cursor', 'pointer');
            $(this).css('font-weight', 'bold');
        });

        linkQuery.on("mouseout", function()
        {
            $(this).css('font-weight', 'normal');
        });
    }

    function LoadHeader() : void {
        $.get("./views/components/header.html", function (html_data){
            $("header").html(html_data);
            AddNavigationEvents();
            CheckLogin();
        });
    }

    function LoadContent() : void {

        let page : string = router.ActiveLink;
        let callback : Function = ActiveLinkCallback();

        $.get(`./views/content/${page}.html`, function (html_data){
            $("main").html(html_data);
            callback();
        });
    }

    function LoadFooter() : void{
        $.get("./views/components/footer.html", function (html_data){
            $("footer").html(html_data);
        });
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
           LoadLink("contact-list");
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
                LoadLink("edit", "add");
            });

            $("button.delete").on("click", function () {
                if(confirm("Are you sure you want to delete this contact?")){
                    localStorage.removeItem($(this).val() as string);
                }
                LoadLink("contact-list");
            });

            $("button.edit").on("click", function () {
                LoadLink("edit", $(this).val() as string);
            });
        }
    }

    function DisplayEditPage() : void {
        console.log("Edit Contact Page")

        ContactFormValidation();

        let page = router.LinkData;

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
                    LoadLink("contact-list");
                });

                $("#CancelBtn").on("click", () => {
                    LoadLink("contact-list");
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

                    LoadLink("contact-list");
                });
                $("#CancelBtn").on("click", () => {
                    LoadLink("contact-list");
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

                AddNavigationEvents();

                LoadLink("login");
            })
        }
    }

    function DisplayLoginPage() : void {
        console.log("Display Login Page");

        let messageArea = $("#messageArea");
        messageArea.hide();

        AddLinkEvents("register");

        $("#loginBtn").on("click", function(){

            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function(data){

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
                    LoadLink("contact-list");
                }
                else{
                    $("#userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Failed to authenticate");
                }

            });

        });

        $("#cancelBtn").on("click", function(){
            document.forms[0].reset();
            LoadLink("home");
        })
    }
    function DisplayRegisterPage() : void {
        console.log("Display Register Page")
        AddLinkEvents("login");

        $("#cancelBtn").on("click", function(){
            document.forms[0].reset();
            LoadLink("register");
        })
    }

    function Display404Page() : void {
        console.log("Displaying 404 Page")
    }

    function capitalizeFirstCharacter(str : string) : string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function ActiveLinkCallback() : Function {

        switch(router.ActiveLink)
        {
            case "home" : return DisplayHomePage;
            case "about" : return DisplayAboutUsPage;
            case "products" : return DisplayProductsPage;
            case "services" : return DisplayServicesPage;
            case "contact" : return DisplayContactPage;
            case "contact-list" : return DisplayContactListPage;
            case "edit" : return DisplayEditPage;
            case "login" : return DisplayLoginPage;
            case "register" : return DisplayRegisterPage;
            case "404" : return Display404Page;
            default:
                console.error("Error: Callback does not exist " + router.ActiveLink);
                return new Function();
        }
    }

    function Start() : void {
        console.log("App Started!");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
    }

    window.addEventListener("load", Start)

})();