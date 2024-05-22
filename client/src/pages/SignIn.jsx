import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
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
    const apiEndPoint = "api/auth/signin";
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${baseUrl}/${apiEndPoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include credentials (cookies)
      });
      const data = await response.json();
      if (data.status === 200) {
        setError("");
        navigate("/");
      }
      if (data.success == false) {
        setError(data?.message);
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
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        {error && <p className="text-red-500">{error}</p>}
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
            disabled={loading}
            className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 "
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
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
