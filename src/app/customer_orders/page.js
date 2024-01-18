"use client";

import { useQuery } from "react-query";
import { Table } from "react-daisyui";

import { getCustomerOrders } from "../utils/orders";
import Order from "./Order";

function CustomerOrders() {
  const { data, isLoading } = useQuery("orders", getCustomerOrders);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1 className="text-2xl m-2">YOUR PAST ORDERS</h1>
      <hr />
      {!data.length ? (
        <h1 className="text-2xl m-2">No Orders To Show...</h1>
      ) : (
        <Table className="mx-auto bg-white text-black">
          <Table.Head className="text-black">
            <span>Order ID</span>
            <span>Items</span>
            <span>Amount</span>
            <span>Date Of Purchase</span>
          </Table.Head>
          <Table.Body>
            {data.map((order, i) => (
              <Order key={i} order={order} />
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export default CustomerOrders;
