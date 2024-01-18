"use client";

import { useQuery } from "react-query";

import ProductCard from "./ProductCard";
import { getProducts } from "../utils/products";

function ProductsList() {
  const { data, isLoading } = useQuery("products", getProducts);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <h2 className="text-2xl m-5">CATALOG</h2>
      <div className="container mx-auto py-2">
        <div className="grid grid-rows-1 grid-flow-col gap-2 justify-start overflow-x-auto">
          {data?.length ? (
            data?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <h2>No Products To Show...</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductsList;
