import axios from "axios";

export async function createOrder() {
  const res = await axios.post(
    `https://ecom-b10-server.onrender.com/orders`,
    null,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );

  return res.data;
}

export async function getCustomerOrders() {
  const res = await axios.get(`https://ecom-b10-server.onrender.com/orders`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  return res.data;
}

export async function getAdminOrders() {
  const res = await axios.get(
    `https://ecom-b10-server.onrender.com/orders/all`,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );

  return res.data;
}
