import axios from "axios";

export const getProducts = async () => {
  const res = await axios.get(`https://ecom-b10-server.onrender.com/products`);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(
    `https://ecom-b10-server.onrender.com/products/${id}`,
    {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    }
  );
  return res.data;
};

export const addProduct = async ({ product, image }) => {
  //<form enctype="multipart/form-data"></form>
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("description", product.description);
  formData.append("quantity", product.quantity);
  formData.append("image", image);

  const res = await axios.post(
    `https://ecom-b10-server.onrender.com/products`,
    formData,
    {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }
  );
  return res.data;
};

export const updateProduct = async ({ updatedProduct, image }) => {
  const formData = new FormData();
  formData.append("name", updatedProduct.name);
  formData.append("price", updatedProduct.price);
  formData.append("description", updatedProduct.description);
  formData.append("quantity", updatedProduct.quantity);
  formData.append("image", image);

  const res = await axios.put(
    `https://ecom-b10-server.onrender.com/products/${updatedProduct._id}`,
    formData,
    {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }
  );
  return res.data;
};

export const activateProduct = async (id) => {
  const res = await axios.patch(
    `https://ecom-b10-server.onrender.com/products/${id}`,
    null,
    {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }
  );
  return res.data;
};
