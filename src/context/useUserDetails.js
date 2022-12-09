import { useState } from 'react' ;

export default function useUserDetails() {
    const getEcomUser = () => {
        const userString = sessionStorage.getItem("ecomuser");
        const ecomuser = JSON.parse(userString);
        return (ecomuser ? ecomuser : "");
    }

    const [ecomuser, setEcomuser] = useState(getEcomUser);

    const saveUser = user => {
        sessionStorage.setItem("ecomuser", JSON.stringify(user));
        setEcomuser(user);
    }
}