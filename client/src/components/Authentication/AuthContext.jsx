import React, { useContext, useMemo } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [userid, setUserid] = useState("");
  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      setUserid,
      userid,
    }),
    [currentUser, userid]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
