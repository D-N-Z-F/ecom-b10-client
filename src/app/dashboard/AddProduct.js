"use client";

import { Input, Button, FileInput } from "react-daisyui";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { addProduct } from "../utils/products";

function AddProductForm({ isAdding }) {
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addProduct, {
    onSuccess: (data) => {
      if (!data.status) {
        queryClient.invalidateQueries("products"); //This one invalidates "products"
        toast.success(data.msg, {
          position: "bottom-right",
          autoClose: 2000,
          closeOnClick: true,
          theme: "dark",
          pauseOnHover: false,
        });
      } else {
        toast.error(data.msg, {
          position: "bottom-right",
          autoClose: 2000,
          closeOnClick: true,
          theme: "dark",
          pauseOnHover: false,
        });
      }
    },
    onError: (error) => {
      toast.error("Something Went Wrong...", {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: false,
      });
    },
  });

  const onChangeHandler = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });
  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate({ product, image });
    isAdding(false);
  };
  const imageHandler = (e) => setImage(e.target.files[0]);

  return (
    <div className="grid grid-cols-12 bg-gray-200">
      <div className="sm:col-start-5 sm:col-span-4 col-span-10 col-start-2">
        <form
          className="py-5"
          method="POST"
          encType="multipart/form-data"
          onSubmit={onSubmitHandler}
        >
          <div className="mb-4">
            <Input
              type="text"
              className="w-full"
              placeholder="Product Name"
              name="name"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              type="number"
              className="w-full"
              placeholder="Product Price"
              name="price"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              className="w-full"
              placeholder="Product Description"
              name="description"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              type="number"
              className="w-full"
              placeholder="Product Quantity"
              name="quantity"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <FileInput
              className="w-full"
              placeholder="Product Image"
              name="image"
              onChange={imageHandler}
              bordered
            />
          </div>
          <Button type="submit" className="block w-full" color="success">
            Add Product
          </Button>
          <Button
            type="button"
            className="mt-4 block w-full"
            color="error"
            onClick={() => isAdding(false)}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddProductForm;
