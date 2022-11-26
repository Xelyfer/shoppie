import React, { useReducer } from "react";

import axios from "axios";

const ACTIONS = {
  FIELD: "field",
  CREATE: "create",
  RESET: "reset",
  DESCRIPTION: "description",
  IMAGES: "images",
  INCREMENT_DES_IMG: "increment-des-img",
  SUCCESS: "success",
  FAILURE: "failure",
};

function createReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FIELD:
      if (
        action.field === ACTIONS.DESCRIPTION ||
        action.field === ACTIONS.IMAGES
      ) {
        let currentArray;

        if (action.field === ACTIONS.DESCRIPTION) {
          currentArray = state.description;
        } else {
          currentArray = state.images;
        }

        currentArray[action.key] = action.value;
        return {
          ...state,
          [action.field]: currentArray,
        };
      } else {
        return {
          ...state,
          [action.field]: action.value,
        };
      }
      break;

    case ACTIONS.INCREMENT_DES_IMG:
      let currentArray;

      if (action.field === ACTIONS.DESCRIPTION) {
        currentArray = state.description;
      } else {
        currentArray = state.images;
      }

      if (currentArray[currentArray.length - 1] !== "") {
        currentArray.push("");
      }

      return {
        ...state,
        [action.field]: currentArray,
      };
      break;

    case ACTIONS.RESET:
      return {
        name: "",
        price: 0,
        stock: 0,
        description: [],
        images: [],
      };
      break;

    case ACTIONS.SUCCESS:
      return {
        ...state,
        showMessage: true,
        isSuccessful: true,
        isSuccessfulMessage: "Successfully added product into the database",
      };
      break;

    case ACTIONS.FAILURE:
      return {
        ...state,
        showMessage: true,
        isSuccessful: false,
        isSuccessfulMessage:
          "Unfortunately there was a problem adding your product to the database. Product Name cannot be empty.",
      };
      break;

    default:
      return state;
      break;
  }
}

const initialState = {
  name: "",
  price: 0,
  stock: 0,
  description: [],
  images: [],
  showMessage: false,
  isSuccessful: false,
  isSuccessfulMessage: "",
};

function Create() {
  const [state, dispatch] = useReducer(createReducer, initialState);

  const {
    name,
    price,
    stock,
    description,
    images,
    showMessage,
    isSuccessful,
    isSuccessfulMessage,
  } = state;

  async function onSubmit(e) {
    e.preventDefault();

    if (name !== "") {
      const newProduct = {
        name: name,
        price: price,
        stock: stock,
        description: description,
        images: images,
      };

      await axios
        .post(
          "https://xelyfer-shoppie-server.onrender.com/record/add",
          newProduct
        )
        .then(dispatch({ type: ACTIONS.RESET }))
        .then(dispatch({ type: ACTIONS.SUCCESS }));
    } else {
      dispatch({ type: ACTIONS.FAILURE });
    }
  }

  return (
    <div className="create-product">
      <div className="create-product-container">
        <h3>Create New Product</h3>
        <form onSubmit={onSubmit}>
          <div className="create-product-name">
            <p htmlFor="">Product Name: </p>
            <input
              type="text"
              value={name}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.FIELD,
                  field: "name",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="create-product-price">
            <p htmlFor="">Product Price: </p>
            <input
              type="number"
              value={price}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.FIELD,
                  field: "price",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="create-product-stock">
            <p htmlFor="">Product Stock: </p>
            <input
              type="number"
              value={stock}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.FIELD,
                  field: "stock",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="create-product-description">
            <p htmlFor="">Product Description: </p>
            {description.map((des, key) => {
              return (
                <>
                  <textarea
                    className="create-product-textarea"
                    key={key}
                    type="text"
                    value={des}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.FIELD,
                        field: ACTIONS.DESCRIPTION,
                        value: e.target.value,
                        key: key,
                      })
                    }
                  />
                </>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: ACTIONS.INCREMENT_DES_IMG,
                field: ACTIONS.DESCRIPTION,
              })
            }
          >
            Add New Description
          </button>
          <div className="create-product-images">
            <p htmlFor="">Product Images: </p>
            {images.map((des, key) => {
              return (
                <>
                  <textarea
                    className="create-product-textarea"
                    key={key}
                    type="text"
                    value={des}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.FIELD,
                        field: ACTIONS.IMAGES,
                        value: e.target.value,
                        key: key,
                      })
                    }
                  />
                </>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: ACTIONS.INCREMENT_DES_IMG,
                field: ACTIONS.IMAGES,
              })
            }
          >
            Add New Image
          </button>
          <br />
          <br />
          <br />
          <button className="flex-center" type="submit">
            Create Product
          </button>
          <br />
          <br />
          {showMessage ? (
            <>
              {isSuccessful ? (
                <div style={{ color: "green" }}>{isSuccessfulMessage}</div>
              ) : (
                <div style={{ color: "red" }}>{isSuccessfulMessage}</div>
              )}
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default Create;
