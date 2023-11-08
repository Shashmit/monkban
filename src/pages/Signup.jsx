import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import loginImage from "../assests/login.png";
import authApi from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    if (password !== confirmPassword)
      return setErrors("Password does not match");
    try {
      const res = await authApi.signup({
        username,
        password,
        confirmPassword,
      });
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      setErrors("Invalid Credentials");
    }
  }

  return (
    <section className="bg-shade min-h-screen flex items-center justify-center p-2">
      <div className="bg-hold max-sm:grid max-sm:grid-cols-1 grid grid-cols-2 rounded-2xl max-w-3xl p-5 ">
        {/* form */}
        <div className="sm:1/2 w-full px-10 my-10">
          <h2 className="font-bold text-2xl">Register</h2>
          <p className="mt-4 text-sm">
            Register to become a member of our community
          </p>
          <form className="flex flex-col gap-4" onSubmit={register}>
            <input
              type="text"
              name="username"
              placeholder=" Username"
              className="p-2 mt-8 rounded-xl hover:border"
              onChange={(e) => setuserName(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="********"
              className="p-2  rounded-xl hover:border"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="*********"
              className="p-2 rounded-xl hover:border"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange rounded-2xl py-2 text-gray hover: cursor-pointer hover:ring-2 hover:ring-opacity-5 text-m px-3"
            >
              Signup
            </button>
            {errors && (
              <div className="text-red-500 text-sm">
                <p>{errors}</p>
              </div>
            )}
          </form>

          <p className="mt-4 text-sm">
            If you have a user account
            <Link
              to={"/login"}
              className="text-base underline underline-offset-1 mx-1"
            >
              login
            </Link>
          </p>
        </div>
        {process.env.BASE}
        <div className="sm:block hidden">
          <img src={loginImage} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Register;
