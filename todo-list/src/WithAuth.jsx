import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function WithAuth(WrappedComponent) {
  function gandu() {
    useEffect(() => {
      const user = Cookies.get("user");
      if (user) {
        axios
          .post("/auth", {
            email: JSON.parse(user).email,
            password: JSON.parse(user).password,
          })
          .then((res) => {
            if (res.data.user && res.data.pwd) {
              return true;
            } else {
              return false;
            }
          });
      }
    }, []);
    return true;
  }

  return (props) => {
    if (gandu) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to={"/"} />;
    }
  };
}
