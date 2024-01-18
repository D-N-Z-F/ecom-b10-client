import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { createOrder as orderCreate } from "@/app/utils/orders";

const style = { layout: "vertical" };

const ButtonWrapper = ({ showSpinner, mutate }) => {
  const [{ options, isPending }] = usePayPalScriptReducer();

  async function createOrder() {
    const res = await fetch("https://ecom-b10-server.onrender.com/cart", {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const data = await res.json();

    return data._id;
  }

  async function onApprove(data) {
    mutate();
    return data;
  }

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
};

function PayPal() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(orderCreate, {
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
  const options = {
    "client-id":
      "AVBJQS-x2VY_qYHns0uV6FjhUBDPVoKfo8zvA5zYaVThyThmSD730BxWlTfzju5e2hcpfZFZk8hSqEAX",
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  return (
    <PayPalScriptProvider options={options}>
      <ButtonWrapper showSpinner={false} mutate={mutate} />
    </PayPalScriptProvider>
  );
}

export default PayPal;
