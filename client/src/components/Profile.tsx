import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Profile = () => {
  const { user } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    if (user === null || user === undefined) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="centered-container-col">
      <img className="thumbnail" src={user?.picture} alt="Display" />
      <h3>{user?.name}</h3>
      <h4>{user?.email}</h4>
    </div>
  );
};

export default Profile;
