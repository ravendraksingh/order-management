import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";

const EcomGoogleLogin = (props) => {
  const clientId =
    "614421637391-0pp02dt34l6o2e10oe446pneo189cjnv.apps.googleusercontent.com";

  const [ecomuser, setEcomuser] = useState();
  
  const onSuccess = (res) => {
    console.log("success:", res);
    const user = {
        "email" : res.profileObj.email,
        "firstname" : res.profileObj.givenName,
        "lastname" : res.profileObj.familyName,
        "image_url": res.profileObj.imageUrl,
        "isloggedin" : true,
        "googleAuth": true
    }
      sessionStorage.setItem("ecomuser", JSON.stringify(user));
      props.onSuccess(user);
  }

  const onFailure = (err) => {
    console.log("failed:", err);
  }

  useEffect(() => {
    const initClient = () => {
      //gapi.client.init({
        gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const logOut = () => {
    sessionStorage.removeItem("ecomuser")
  };

  return (
    <div>
      {ecomuser?.googleId ? (
        <div>
          {/* <img src={profile.imageUrl} alt="user image" /> */}
          <p>User Logged in</p>
          <p>Name: {ecomuser.firstname}</p>
          <p>Email Address: {ecomuser.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>
  );
};

export default EcomGoogleLogin;
