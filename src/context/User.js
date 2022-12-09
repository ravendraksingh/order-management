import { createContext } from "react";

export let ecomuser = {
    email: "",
    firstname: "",
    lastname: "",
    image_url: "",
    isloggedin: false,
    googleauth: false
}

const UserContext = createContext(ecomuser);

export const getUserObject = () => {
    let userJson = window.sessionStorage.getItem("ecomuser");
    if (userJson !== null) {
        let userObject = JSON.parse(userJson);
        user.email = userObject.email;
        user.firstname = userObject.firstname;
        user.lastname = userObject.lastname;
        user.image_url = userObject.image_url;
        user.isloggedin = userObject.isloggedin;
    } 
}

export const UserProvider = UserContext.Provider

export default UserContext;