import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const Logout = () => {
  const { logOut } = useContext(GlobalContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => logOut(), []);
  return null;
};

export default Logout;
