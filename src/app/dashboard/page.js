"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import { Table, Button } from "react-daisyui";

import DashboardTable from "./DashboardTable";
import AddProductForm from "./AddProduct";
import { getProducts } from "../utils/products";

function DashboardList() {
  const [adding, isAdding] = useState(false);

  const { data, isLoading } = useQuery("products", getProducts);
  //"products" is the current data cached, and when invalidated, it will re-run getProducts, which will re-fetch the data

  if (isLoading) return <h2>Loading...</h2>;
  //If you dont want to the isLoading above, you can call data?.length)
  //This allows something to be shown as undefined if it is null/undefined without throwing an error, therefore allowing the code to run

  return (
    <>
      <Button
        className="block m-3"
        color="info"
        onClick={() => isAdding(!adding)}
      >
        New +
      </Button>
      {adding ? <AddProductForm isAdding={isAdding} /> : <></>}

      <h2 className="text-2xl">DASHBOARD</h2>
      <div className="container mx-auto pt-5">
        {data.length ? (
          <Table>
            <Table.Head className="bg-gray-300 text-neutral">
              <span style={{ display: "flex", justifyContent: "center" }}>
                Active
              </span>
              <span />
              <span>Name</span>
              <span>Description</span>
              <span>Quantity</span>
              <span>Price</span>
              <span style={{ display: "flex", justifyContent: "center" }}>
                Actions
              </span>
            </Table.Head>
            <Table.Body className="bg-gray-200 text-neutral">
              {data.map((product) => (
                <DashboardTable key={product._id} product={product} />
              ))}
            </Table.Body>
          </Table>
        ) : (
          <h2>No Products To Show...</h2>
        )}
      </div>
    </>
  );
}

export default DashboardList;
