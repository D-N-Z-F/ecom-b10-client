"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Table,
  Modal,
  FileInput,
} from "react-daisyui";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import {
  deleteProduct,
  updateProduct,
  activateProduct,
} from "../utils/products";

function DashboardTable({ product }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [image, setImage] = useState();
  const { mutate: updateMutate } = useMutation(updateProduct, {
    onSuccess: (data) => {
      if (!data.status) {
        queryClient.invalidateQueries(["products"]); //This one invalidates "products"
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
  const { mutate: deleteMutate } = useMutation(deleteProduct, {
    onSuccess: (data) => {
      if (!data.status) {
        queryClient.invalidateQueries(["products"]); //This one invalidates "products"
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
  const { mutate: stateMutate } = useMutation(activateProduct, {
    onSuccess: (data) => {
      if (!data.status) {
        queryClient.invalidateQueries(["products"]); //This one invalidates "products"
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

  const deleteHandler = (id) => deleteMutate(id);
  const stateHandler = (id) => stateMutate(id);
  const imageHandler = (e) => setImage(e.target.files[0]);
  const onChangeHandler = (e) =>
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  const updateHandler = (e) => {
    e.preventDefault();
    updateMutate({ updatedProduct, image });
    setEditing(false);
  };

  return (
    <Table.Row>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => stateHandler(product._id)}
          className="mr-2"
          color={product.isActive ? "error" : "success"}
        >
          {product.isActive ? "Disable" : "Enable"}
        </Button>
        <Checkbox
          disabled
          style={{
            backgroundColor: product.isActive ? "darkgreen" : "red",
            opacity: "1",
          }}
        />
      </span>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={`https://ecom-b10-server.onrender.com/${product.image}`}
          style={{
            height: "250px",
            width: "300px",
            objectFit: "cover",
            border: "2px solid white",
            borderRadius: "25%",
          }}
        />
      </span>
      <span>{product.name}</span>
      <span>{product.description}</span>
      <span>{product.quantity}</span>
      <span>${product.price}</span>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{ border: "2px solid black" }}
          className="btn btn-warning mr-2"
          onClick={() => setEditing(true)}
        >
          Edit
        </Button>

        {editing ? (
          <Modal open={editing}>
            <Modal.Header className="font-bold" style={{ color: "grey" }}>
              Update Product
            </Modal.Header>
            <Modal.Body>
              <form
                className="py-5"
                method="POST"
                encType="multipart/form-data"
                onSubmit={(e) => updateHandler(e)}
              >
                <div className="mb-4">
                  <Input
                    type="text"
                    className="w-full text-white"
                    placeholder="Name"
                    name="name"
                    onChange={onChangeHandler}
                    value={updatedProduct.name}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="number"
                    className="w-full text-white"
                    placeholder="Price"
                    name="price"
                    onChange={onChangeHandler}
                    value={updatedProduct.price}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    className="w-full text-white"
                    placeholder="Description"
                    name="description"
                    onChange={onChangeHandler}
                    value={updatedProduct.description}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="number"
                    className="w-full text-white"
                    placeholder="Quantity"
                    name="quantity"
                    onChange={onChangeHandler}
                    value={updatedProduct.quantity}
                  />
                </div>
                <div className="mb-4">
                  <FileInput
                    className="w-full text-white"
                    placeholder="Product Image"
                    name="image"
                    onChange={imageHandler}
                    bordered
                  />
                </div>
                <Button
                  type="button"
                  className="mr-2"
                  color="error"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" color="success">
                  Confirm
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        ) : null}

        <Button
          style={{ border: "2px solid black" }}
          className="btn btn-error"
          onClick={() => deleteHandler(product._id)}
        >
          Delete
        </Button>
      </span>
    </Table.Row>
  );
}

export default DashboardTable;
