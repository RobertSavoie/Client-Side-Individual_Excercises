"use strict";

class Contact {

    // Constructors
    constructor(fullName, contactNumber, emailAddress){
        this.FullName = fullName;
        this.ContactNumber = contactNumber;
        this.EmailAddress = emailAddress;
    }

    // Setters
    set FullName(fullName) {
        this.m_fullname = fullName;
    }
    set ContactNumber(contactNumber) {
        this.m_contactnumber = contactNumber;
    }
    set EmailAddress(emailAddress) {
        this.m_emailaddress = emailAddress;
    }

    // Getters
    get FullName(){
        return this.m_fullname;
    }
    get ContactNumber(){
        return this.m_contactnumber;
    }
    get EmailAddress(){
        return this.m_emailaddress;
    }

    // Methods
    toString(){
        return `Full Name: ${this.FullName}\n 
                Contact Number: ${this.ContactNumber}\n 
                Email Address: ${this.EmailAddress}`;
    }

    serialize(){
        if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== ""){
            return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
        }
        console.error("One of more of the contact attributes is/are empty or missing");
        return null;
    }
    deserialize(data){
        let propertyArray = data.split(",");
        this.FullName = propertyArray[0];
        this.ContactNumber = propertyArray[1];
        this.EmailAddress = propertyArray[2];
    }

}