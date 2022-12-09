import React, { useState, useEffect } from "react";

let user = {
  email: "",
  firstname: "",
  lastname: "",
  image_url: "",
  isloggedin: false,
  googleauth: false,
};

const AuthContext = React.createContext({
    ecomuser: user,
    onLogin: () => {},
    onLogout: () => {}
});

export const AuthContextProvider = (props) => {
  const [ecomuser, setEcomuser] = useState({});

  const logoutHandler = () => {
      sessionStorage.removeItem("ecomuser");
      setEcomuser(user);
  };

  const loginHandler = (user) => {
    sessionStorage.setItem("ecomuser", JSON.stringify(user));
    setEcomuser(user);
  };

  useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem("ecomuser")) ?? "";
      if (user !== null) {
          setEcomuser(user);
      }
    }, []);

  return (
    <AuthContext.Provider
      value={{
        ecomuser: ecomuser,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
