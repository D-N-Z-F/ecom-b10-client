"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { Button, Table } from "react-daisyui";
import { toast } from "react-toastify";

import { deleteCart, getCart } from "../utils/cart";
import CartItem from "./CartItem";
import { createOrder } from "../utils/orders";
import PayPal from "@/components/Paypal";

function Cart() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery("cart", getCart);
  const { mutate: createMutate } = useMutation(createOrder, {
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
  const { mutate: deleteMutate } = useMutation(deleteCart, {
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

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl m-2">YOUR CART</h1>
      <hr />
      {!data.items ? (
        <h1 className="text-2xl m-2">Cart Is Empty...</h1>
      ) : (
        <Table className="mx-auto bg-white text-black">
          <Table.Head className="text-black">
            <span>Name</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Action</span>
          </Table.Head>
          <Table.Body>
            {data?.items?.map((item, i) => (
              <CartItem key={i} item={item} />
            ))}
          </Table.Body>
          <Table.Footer
            className="text-black"
            style={{ borderTop: "1px solid black" }}
          >
            <span>
              {/* {<Button className="text-white" onClick={createMutate}>
                Checkout
              </Button>} */}
              <PayPal />
            </span>
            <span></span>
            <span></span>
            <span>Total: {data.total}</span>
            <span>
              <Button color="error" onClick={deleteMutate}>
                Empty Cart
              </Button>
            </span>
          </Table.Footer>
        </Table>
      )}
    </div>
  );
}

export default Cart;
