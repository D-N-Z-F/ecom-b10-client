import { Card, Button, Input } from "react-daisyui";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { addToCart } from "../utils/cart";
import { AuthContext } from "../AuthProvider";

function ProductCard({ product }) {
  const queryClient = useQueryClient();
  const { token, user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const { mutate } = useMutation(addToCart, {
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

  const onChangeHandler = (e) => setQuantity(e.target.value);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let productId = product._id;
    if (quantity < 1) return alert("Too LITTLE");
    if (quantity > product.quantity) return alert("Too MANY");
    mutate({ quantity, productId });
  };

  return (
    <Card
      className="bg-base-100 shadow-xl image-full"
      style={{ height: "350px", width: "350px" }}
    >
      <Card.Image
        src={`https://ecom-b10-server.onrender.com/${product.image}`}
      />
      <Card.Body>
        <Card.Title tag="h3">{product.name}</Card.Title>
        <p>{product.description}</p>
        <small>{product.quantity} left</small>
        <small>${product.price}</small>

        {token && !user.isAdmin ? (
          <form method="POST" onSubmit={onSubmitHandler}>
            <Button
              style={{ border: "2px solid black", marginRight: "20px" }}
              color="primary"
            >
              +
            </Button>
            <Input
              type="number"
              name="quantity"
              className="w-48"
              placeholder="1"
              onChange={onChangeHandler}
            />
          </form>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
