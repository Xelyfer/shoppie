import { useReducer, createContext } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

export const ACTIONS = {
  TOGGLE_CREATE: "toggle-create",
  INSTATIATE_PRODUCT_CARD: "instatiate-product-card",
  ADD_TO_CART: "add-to-cart",
  DELETE_FROM_CART: "delete-from-cart",
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_CREATE:
      return {
        ...state,
        isToggledCreate: !state.isToggledCreate,
      };
      break;

    case ACTIONS.INSTATIATE_PRODUCT_CARD:
      return {
        ...state,
        isLoading: true,
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

    default:
      return state;
      break;
  }
}

const initialState = {
  isToggledCreate: false,
  isLoading: false,
  cart: [],
};

export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

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
