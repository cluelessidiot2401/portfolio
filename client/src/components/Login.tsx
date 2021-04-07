import React, { useContext } from "react";
// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import GoogleLogin from "react-google-login";

const Login = () => {
  const { saveGoogleUserInfo } = useContext(GlobalContext);
  // const history = useHistory();

  const onSignIn = async (googleUser: any) => {
    await saveGoogleUserInfo(googleUser);
    // history.push("/profile");
  };

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GAPI_CLIENT_ID as string}
      buttonText="Sign in with Google"
      onSuccess={onSignIn}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Login;
