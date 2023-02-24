"use strict";

(function (core){

    class Router{

        //public properties
        /**
         *
         * @returns {string}
         */
        get ActiveLink(){
            return this.m_activelink;
        }

        /**
         *
         * @param string
         */
        set ActiveLink(link){
            this.m_activelink = link;
        }

        //constructor
        constructor() {
            this.m_activelink = "";
        }

        //public methods

        Add(route){
            this.m_routingTable.push(route);
        }

        AddTable(routingTable){
            this.m_routingTable = routingTable;
        }

        Find(route){
            return this.m_routingTable.indexOf(route);
        }

        Remove(route){
            if(this.Find(route) > -1){
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        //public overrides
        toString(){
            //TODO
        }
    }

    core.Router = Router;

})(core || (core = {}));

let router = new core.Router();

router.Add([
   "/",
   "/home",
   "/about",
   "/contact",
   "/contact-list",
   "/edit",
   "/login",
   "/register",
   "/products",
   "/services"
]);

let route = location.pathname;

router.ActiveLink = (this.Find(route) > -1)
                    ? (route === "/") ? "home" : route.substring(1)
                    : ("404");