import React, { useContext, useState } from "react";
import "./Registration.scss";
import Login from "./Login";
import { GlobalContext } from "../context/GlobalState";

const Registration = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const { user, updateUser, commitUser, getUserByEmail } = useContext(
    GlobalContext
  );

  const validateMobileNumber = (mobileNumber: string) =>
    /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/.test(mobileNumber);

  const registerUser = async () => {
    if (user) {
      user.mobileNumber = mobileNumber;
      user.registrationStatus = "registered";
      await updateUser(user);
      const updatedUser = await getUserByEmail(user);
      if (updatedUser) commitUser(updatedUser);
    }
  };

  const componentsToRender = (): JSX.Element => {
    return (
      <>
        {(!user || user.registrationStatus === "onboarded") && (
          <h3 className="text">Register below to get access</h3>
        )}
        {user && user.registrationStatus === "registered" && (
          <>
            <h3 className="text">
              You are already registered. Your request will be approved soon.
            </h3>
            <h3 className="text">
              Requests are usually approved within 24 hours. Please check in
              after some time.
            </h3>
          </>
        )}
        <div className="joinOuterContainer">
          {!user && <Login />}
          {user && user.registrationStatus === "onboarded" && (
            <div className="joinInnerContainer">
              <h1 className="heading">Register below</h1>
              <div>
                <div className="form-items">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input
                    placeholder="Mobile Number"
                    type="number"
                    id="mobileNumber"
                    className="joinInput"
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
                {mobileNumber.length > 0 &&
                  !validateMobileNumber(mobileNumber) && (
                    <h4 className="error">Invalid mobile number</h4>
                  )}
              </div>
              <div className="form-items">
                <button
                  disabled={!validateMobileNumber(mobileNumber)}
                  className="button mt-20"
                  type="submit"
                  onClick={registerUser}
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="registration">
      <h2 className="heading">
        Welcome to the Registration Page
      </h2>
      {componentsToRender()}
    </div>
  );
};

export default Registration;
