"use client";

import { Button, Mask, Table } from "react-daisyui";
import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";

import { deleteCartItem } from "../utils/cart";

function CartItem({ item }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteCartItem, {
    onSuccess: (data) => {
      if (!data.status) {
        queryClient.invalidateQueries(["cart"]); //This one invalidates "cart"
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

  const deleteHandler = (productId) => mutate(productId);

  return (
    <Table.Row>
      <div className="flex items-center space-x-3 truncate">
        <Mask
          className="w-32 h-32 object-cover"
          variant="squircle"
          src={`https://ecom-b10-server.onrender.com/${item.product.image}`}
        />
        <div>
          <h4>{item.product.name}</h4>
        </div>
      </div>
      <div>{item.product.price}</div>
      <div>{item.quantity}</div>
      <div>{item.subtotal}</div>
      <div>
        <Button color="error" onClick={() => deleteHandler(item.product._id)}>
          Remove
        </Button>
      </div>
    </Table.Row>
  );
}

export default CartItem;
