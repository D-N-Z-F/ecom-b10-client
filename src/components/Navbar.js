"use client";

import { Navbar, Button, Dropdown } from "react-daisyui";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";

function TopNav() {
  const {
    token,
    setToken,
    user,
    setUser: setUserData,
  } = useContext(AuthContext);
  const { push } = useRouter(); //To redirect

  const logoutHandler = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    push("/");
  };

  return (
    <Navbar className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <Button tag="a" href="/" className="text-xl normal-case" color="ghost">
          E-COMMERCE
        </Button>
      </div>
      <div>
        <Dropdown className="dropdown-end">
          <Button
            tag="label"
            tabIndex={0}
            color="ghost"
            className="avatar"
            shape="circle"
          >
            <div className="w-10 rounded-full">
              <img src="https://blog.tuitt.com/wp-content/uploads/2019/04/DSCF3769-1024x683.jpg" />
            </div>
          </Button>
          <Dropdown.Menu className="w-52 menu-sm mt-3 z-[100] p-2">
            {token && user ? (
              <>
                <li>
                  <a href="/products">CATALOG</a>
                </li>
                <li>
                  <a href="/cart">CART</a>
                </li>
                <li>
                  <a href={user.isAdmin ? "/admin_orders" : "customer_orders"}>
                    ORDERS
                  </a>
                </li>
                {token && user.isAdmin ? (
                  <li>
                    <a href="/dashboard">DASHBOARD</a>
                  </li>
                ) : null}
                <li>
                  <Button
                    style={{ width: "50%", margin: "5px", paddingTop: "10px" }}
                    onClick={logoutHandler}
                  >
                    LOGOUT
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/register">REGISTER</a>
                </li>
                <li>
                  <a href="/login">LOGIN</a>
                </li>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default TopNav;
