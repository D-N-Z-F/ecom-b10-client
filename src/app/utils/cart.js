import axios from "axios";

export async function addToCart(product) {
  const res = await axios.post(
    `https://ecom-b10-server.onrender.com/cart`,
    product,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
  return res.data;
}

export async function getCart() {
  const res = await axios.get(`https://ecom-b10-server.onrender.com/cart`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}

export async function deleteCartItem(productId) {
  const res = await axios.delete(
    `https://ecom-b10-server.onrender.com/cart/${productId}`,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
  return res.data;
}

export async function deleteCart() {
  const res = await axios.delete(`https://ecom-b10-server.onrender.com/cart`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  return res.data;
}
