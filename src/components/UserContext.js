import React, { createContext, useState, useEffect } from "react";

//user Context object created by calling the createContext React API
export const UserContext = createContext();

//mockApI function fetch User()

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Amy" });
    }, 5000);
  });
}

//finally the UserProvider Component.The job of this component is to call the fetchUser API and set the user state as the response from the API when it arrives. To do this we use the useState and the useEffect Hooks.
//We've set ourselves up to be able to pass the user value to any components of our application
export function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "***" });

  useEffect(() => {
    fetchUser().then((user) => {
      setUser(user);
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
