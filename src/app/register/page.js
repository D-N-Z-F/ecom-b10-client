"use client";

import { useState } from "react";
import { Input, Button } from "react-daisyui";
import { toast } from "react-toastify";

import { register } from "../utils/users";

function Register() {
  const [user, setUser] = useState({});

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (user.password !== user.password2) {
      toast.error("Passwords Must Match!", {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: false,
      });
    }

    let data = await register(user);

    if (data.status) {
      toast.error(data.msg, {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: false,
      });
    } else {
      toast.success(data.msg, {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="grid grid-cols-12">
      <h1 className="text-2xl m-3">REGISTER</h1>
      <div className="sm:col-start-5 sm:col-span-4 col-span-10 col-start-2">
        <form onSubmit={onSubmitHandler} className="mt-10">
          <div className="mb-4">
            <Input
              className="w-full"
              type="text"
              placeholder="Full Name"
              name="fullname"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              className="w-full"
              type="text"
              placeholder="Username"
              name="username"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              className="w-full"
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              className="w-full"
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              className="w-full"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              onChange={onChangeHandler}
            />
          </div>
          <Button>Register</Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
