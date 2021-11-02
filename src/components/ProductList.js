import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    instatiateProductCardData();
    setIsLoading(false);
  }, []);

  async function instatiateProductCardData() {
    try {
      await axios.get("http://localhost:5000/record/").then((res) => {
        setProductData({ products: res.data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="product-list margin-all-1rem">
      {!isLoading
        ? productData.products?.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        : null}
    </div>
  );
}

export default ProductList;
