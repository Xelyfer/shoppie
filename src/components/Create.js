import React, { useReducer } from "react";

import axios from "axios";

const ACTIONS = {
  FIELD: "field",
  CREATE: "create",
  RESET: "reset",
  DESCRIPTION: "description",
  IMAGES: "images",
  INCREMENT_DES_IMG: "increment-des-img",
};

function createReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FIELD:
      console.log(state);
      console.log(action.field);
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
        console.log(currentArray);
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
};

function Create() {
  const [state, dispatch] = useReducer(createReducer, initialState);

  const { name, price, stock, description, images } = state;

  async function onSubmit(e) {
    e.preventDefault();

    const newProduct = {
      name: name,
      price: price,
      stock: stock,
      description: description,
      images: images,
    };

    await axios
      .post("http://localhost:5000/record/add", newProduct)
      .then((res) => console.log(res.data));

    dispatch(ACTIONS.RESET);
  }

  return (
    <div>
      <h3>Create New Product</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">Product Name: </label>
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
        <div>
          <label htmlFor="">Product Price: </label>
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
        <div>
          <label htmlFor="">Product Stock: </label>
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
        <div>
          <label htmlFor="">Product Description: </label>
          {description.map((des, key) => {
            return (
              <>
                <input
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
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.INCREMENT_DES_IMG,
                field: ACTIONS.DESCRIPTION,
              })
            }
          >
            Add New Description
          </button>
        </div>
        <div>
          <label htmlFor="">Product Images: </label>
          {images.map((des, key) => {
            return (
              <>
                <input
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
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.INCREMENT_DES_IMG,
                field: ACTIONS.IMAGES,
              })
            }
          >
            Add New Image
          </button>
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default Create;
