import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => {
    return state.user;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = "http://localhost:5000";
    const apiEndPoint = "api/auth/signin";
    try {
      dispatch(signInStart());
      const response = await fetch(`${baseUrl}/${apiEndPoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include credentials (cookies)
      });
      const data = await response.json();
      console.log("data", data);

      if (data.status === 200) {
        dispatch(signInSuccess(data));
        localStorage.setItem("access_token", data.token);
        navigate("/");
      }
      if (data?.success == false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            type="text"
            placeholder="Email"
            className="border p-3 rounded-lg"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button
            // disabled={loading}
            className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 "
          >
            {/* {loading ? "Loading..." : "Sign In"} */}
            {"Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-700">Sign up</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
