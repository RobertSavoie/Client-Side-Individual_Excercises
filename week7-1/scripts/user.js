"use strict";

(function (core) {

    class User {

        // Constructors
        constructor(displayName = "", username = "", emailAddress = "", password = "") {
            this.DisplayName = displayName;
            this.Username = username;
            this.EmailAddress = emailAddress;
            this.Password = password;
        }

        // Setters
        set DisplayName(displayName) {
            this.m_displayname = displayName;
        }

        set EmailAddress(emailAddress) {
            this.m_emailaddress = emailAddress;
        }

        set Username(username) {
            this.m_username = username;
        }

        set Password(password) {
            this.m_password = password;
        }

        // Getters
        get DisplayName() {
            return this.m_displayname;
        }

        get EmailAddress() {
            return this.m_emailaddress;
        }

        get Username() {
            return this.m_username;
        }

        get Password() {
            return this.m_password;
        }

        // Methods
        toString() {
            return `Display Name: ${this.DisplayName}\n 
                Email Address: ${this.EmailAddress}\n
                Username: ${this.Username}`;
        }

        toJSON(){
            return {
                "DisplayName" : this.DisplayName,
                "EmailAddress" : this.EmailAddress,
                "Username" : this.Username,
                "Password" : this.Password
            }
        }

        fromJSON(data){
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        serialize() {
            if (this.DisplayName !== "" && this.EmailAddress !== ""
                && this.Username !== "" && this.Password !== "") {
                return `${this.DisplayName},${this.Username},${this.EmailAddress},${this.Password}`;
            }
            console.error("One of more of the contact attributes is/are empty or missing");
            return null;
        }

        deserialize(data) {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
            this.Password = propertyArray[3];
        }
    }
    core.User = User;
})(core || (core = {}));