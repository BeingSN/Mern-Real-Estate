import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      console.log("keyy", process.env.REACT_APP_FIREBASE_API_KEY);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const baseUrl = "http://localhost:5000";
      const endPoint = "api/auth/google";
      const response = await fetch(`${baseUrl}/${endPoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        localStorage.setItem("access_token", data?.token);
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (err) {
      console.log("could not sign in with google", err.message);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 p-3 text-white uppercase rounded-lg  hover:opacity-95"
    >
      Contine with Google
    </button>
  );
};

export default OAuth;
