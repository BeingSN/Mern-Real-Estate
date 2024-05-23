import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = "http://localhost:5000";
    const apiEndPoint = "api/auth/signup";
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${baseUrl}/${apiEndPoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
        setError("");
        navigate("/sign-in");
      }
      if (data.success == false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            name="username"
            onChange={(e) => handleChange(e)}
          />
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
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 "
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
