import React, { useEffect, useContext, useState } from "react";
import ProductCard from "./ProductCard";

import ACTIONS from "../App";
import { StateContext, DispatchContext } from "../App";

function ProductList() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const { productData, productToShow, search } = state;
  const [remaining, setRemaining] = useState(0);

  return (
    <div className="product-list margin-all-1rem">
      {productToShow.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
}

export default ProductList;
