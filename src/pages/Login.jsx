import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import loginImage from "../assests/login.png";

import authApi from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await authApi.login({ username, password });
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      setErrors("Invalid Credentials");
    }
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className="bg-shade min-h-screen flex items-center justify-center p-2">
      <div className="bg-hold max-sm:grid max-sm:grid-cols-1 grid grid-cols-2 rounded-2xl max-w-3xl p-5 ">
        {/* form */}
        <div className="sm:1/2 w-full px-10 my-10">
          <h2 className="font-bold text-2xl">Login</h2>
          <p className="mt-4 text-sm">
            If you are already a member. easily log in
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder={username}
              className="p-2 mt-8 rounded-xl hover:border"
              value={username}
              onChange={handleUsername}
            />
            <input
              type="password"
              name="password"
              placeholder="*********"
              className="p-2 rounded-xl hover:border"
              value={password}
              onChange={handlePassword}
            />
            <button
              type="submit"
              className="bg-orange rounded-2xl py-2 text-gray hover: cursor-pointer hover:ring-2 hover:ring-opacity-5 text-m px-3"
            >
              Login
            </button>
            {errors && (
              <div className="text-red-500 text-sm">
                <p>{errors}</p>
              </div>
            )}
          </form>
          <p className="mt-4 text-sm">
            If you dont have a user account
            <Link
              to={"/signup"}
              className="text-base underline underline-offset-1 mx-1"
            >
              register
            </Link>
          </p>
        </div>

        <div className="sm:block hidden">
          <img src={loginImage} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Login;
