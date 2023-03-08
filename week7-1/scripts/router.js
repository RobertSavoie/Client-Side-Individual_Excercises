"use strict";

(function (core)
{

    class Router
    {
        //public properties

        /**
         *
         * @returns {string}
         */
        get ActiveLink() {
            return this.m_activeLink;
        }

        /**
         *
         * @param String
         */
        set ActiveLink(link){
            this.m_activeLink = link;
        }

        //Constructors
        constructor(){
            this.m_activeLink = "";
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
            return this.m_routingTable.toString();
        }




    }
    core.Router = Router;

})(core || (core = {}));

let router = new core.Router();

router.AddTable([
    "/",
    "/home",
    "/about",
    "/contact",
    "/contact-list",
    "/edit",
    "/login",
    "/products",
    "/register",
    "/services"
]);

let route = location.pathname;

router.ActiveLink = (router.Find(route) > -1)
                    ? (route === "/" ) ? "home" : route.substring(1)
                    : ("404");