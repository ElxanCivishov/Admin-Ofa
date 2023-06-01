import { useState, useEffect } from "react";

export const useLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setIsLoggedIn(!!user);
  }, []);

  return isLoggedIn;
};
