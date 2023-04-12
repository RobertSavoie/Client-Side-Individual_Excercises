import express, {Request, Response, NextFunction} from "express";
import {UserDisplayName} from "../util";

export function DisplayHomePage(req : Request, res : Response, next : NextFunction) : void{
    res.render('index', {title: 'Home', page: 'home', displayName: UserDisplayName(req)});
}
export function DisplayAboutPage(req : Request, res : Response, next : NextFunction) : void{
    res.render('index', {title: 'About Us', page: 'about', displayName: UserDisplayName(req)});
}
export function DisplayProductPage(req : Request, res : Response, next : NextFunction) : void{
    res.render('index', {title: 'Products', page: 'products', displayName: UserDisplayName(req)});
}
export function DisplayServicePage(req : Request, res : Response, next : NextFunction) : void{
    res.render('index', {title: 'Our Services', page: 'services', displayName: UserDisplayName(req)});
}
export function DisplayContactPage(req : Request, res : Response, next : NextFunction) : void{
    res.render('index', {title: 'Contact Us', page: 'contact', displayName: UserDisplayName(req)});
}