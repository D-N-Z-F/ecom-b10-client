"use client";

import { useState, useContext } from "react";
import { Input, Button } from "react-daisyui";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { login } from "../utils/users";
import { AuthContext } from "../AuthProvider";

function Login() {
  const { setToken, setUser: setUserData } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const { push } = useRouter(); //To redirect

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let data = await login(user);

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

      setToken(data.token);
      setUserData(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      push("/");
    }
  };

  return (
    <div className="grid grid-cols-12">
      <h1 className="text-2xl m-3">LOGIN</h1>
      <div className="sm:col-start-5 sm:col-span-4 col-span-10 col-start-2">
        <form onSubmit={onSubmitHandler} className="mt-10">
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
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
            />
          </div>

          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
