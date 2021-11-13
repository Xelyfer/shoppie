import { useReducer, createContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Header from "./components/Header";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import { breadcrumbsClasses } from "@mui/material";

export const ACTIONS = {
  TOGGLE_CREATE: "toggle-create",
  INSTANTIATE_PRODUCT_DATA: "instantitate-product-data",
  INSTANTIATE_PRODUCT_TO_SHOW: "instantitate-product-to-show",
  ADD_TO_CART: "add-to-cart",
  DELETE_FROM_CART: "delete-from-cart",
  SEARCH: "search",
  UPDATE_PRODUCT_TO_SHOW: "update-product-to-show",
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_CREATE:
      return {
        ...state,
        isToggledCreate: !state.isToggledCreate,
      };
      break;

    case ACTIONS.INSTANTIATE_PRODUCT_DATA:
      return {
        ...state,
        productData: action.products,
      };
      break;

    case ACTIONS.INSTANTIATE_PRODUCT_TO_SHOW:
      return {
        ...state,
        productToShow: state.productData,
      };
      break;

    case ACTIONS.ADD_TO_CART:
      const exist = state.cart.find(
        (item) => item.product._id === action.product._id
      );

      let newCart = [];

      if (state.cart.length === 0) {
        newCart = [{ product: action.product, quantity: action.quantity }];
      } else {
        if (exist) {
          const newQuantity =
            state.cart.filter(
              (item) => item.product._id === action.product._id
            )[0].quantity + action.quantity;

          newCart = state.cart.filter(
            (item) => item.product._id !== action.product._id
          );

          newCart = [
            ...newCart,
            { product: action.product, quantity: newQuantity },
          ];
        } else {
          newCart = [
            ...state.cart,
            { product: action.product, quantity: action.quantity },
          ];
        }
      }

      return {
        ...state,
        cart: newCart,
      };
      break;

    case ACTIONS.DELETE_FROM_CART:
      const newCart2 = state.cart.filter((item) => {
        return item.product._id !== action.product._id;
      });
      return {
        ...state,
        cart: newCart2,
      };
      break;

    case ACTIONS.SEARCH:
      return {
        ...state,
        search: action.value,
      };
      break;

    case ACTIONS.UPDATE_PRODUCT_TO_SHOW:
      const regexp = new RegExp(state.search, "i");
      const newArray = state.productData.filter((product) => {
        return regexp.test(product.name);
      });

      return {
        ...state,
        productToShow: newArray,
      };
      break;

    default:
      return state;
      break;
  }
}

const initialState = {
  isToggledCreate: false,
  cart: [],
  search: "",
  productData: [],
  productToShow: [],
};

export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    instantiateProductCardData();
  }, []);

  async function instantiateProductCardData() {
    try {
      await axios.get("http://localhost:5000/record/").then((res) => {
        dispatch({
          type: ACTIONS.INSTANTIATE_PRODUCT_DATA,
          products: res.data,
        });
        dispatch({
          type: ACTIONS.INSTANTIATE_PRODUCT_TO_SHOW,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="App flex-column">
          <Header></Header>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
          </Switch>
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
