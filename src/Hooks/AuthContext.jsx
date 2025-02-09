import React, { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Loading from "../component/Loading";

const Auth = React.createContext();

export function useAuthContext() {
  return useContext(Auth);
}

const AuthContext = ({ children }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user logged in
        setCurrentUser(user);
        setIsAuthLoading(false);
      } else {
        setCurrentUser(null);
        setIsAuthLoading(false);
      }
    });

    return () => unsub();
  }, [auth]);

  const valuesAndFn = { currentUser };

  return (
    <Auth.Provider value={valuesAndFn}>
      {isAuthLoading ? <Loading /> : children}
    </Auth.Provider>
  );
};

export default AuthContext;
