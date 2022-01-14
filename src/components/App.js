import React, { Fragment, useReducer, useEffect } from "react";

//The options array is the items that the user can select from. Initial quantity is 1 and the selected value represents which of the items is selected. Late on, this component will set several other state values. But these are the values that are needed for the initial render.

const initialState = {
  options: [
    { id: 1, name: "First", value: 10 },
    { id: 2, name: "Second", value: 50 },
    { id: 3, name: "Third", value: 200 },
  ],
  quantity: 1,
  selected: 1,
};

// The reducer functions that maintain the state of this component - the state of the increment and decrement buttons is dependent on the quantity value . So the incrementDisabled and decrementDisabled state values are computed in the reduceButtonStates() function which is used by the init, decrementQuantity and increment Quantity actions.

function reduceButtonStates(state) {
  return {
    ...state,
    decrementDisabled: state.quantity === 0,
    incrementDisabled: state.quantity === 10,
  };
}


//The code to tcomput the total is moved into its own function. When the component mounts we also need to compute total. We don't want to have a default state for something that's derived from other state values. Instead, we introduce the init action
function reduceTotal(state) {
  const option = state.options.find((option) => option.id === state.selected);
  return { ...state, total: state.quantity * option.value };
}


//this particular reducer handles the following actions. Each one of these actions has the potential to change the total state.
function reducer(state, action) {
  let newState;
  switch (action.type) {

    //action 'init' when the component first mounts
    case "init":
      newState = reduceTotal(state);
      return reduceButtonStates(newState);
      //action 'decrement Quantity" when the decrement quantity button was pressed
    case "decrementQuantity":
      newState = { ...state, quantity: state.quantity - 1 };
      newState = reduceTotal(newState);
      return reduceButtonStates(newState);
      //action 'increment Quantity" when the increment quantity button was pressed
    case "incrementQuantity":
      newState = { ...state, quantity: state.quantity + 1 };
      newState = reduceTotal(newState);
      return reduceButtonStates(newState);
      // action 'select item' when the selected item was changed
    case "selectItem":
      newState = { ...state, selected: Number(action.id) };
      return reduceTotal(newState);
    default:
      throw new Error(`${action.type} is not a valid action`);
  }
}

//the reducer function is passed to useReducer() and is responsible for handling different action paths.
export default function App() {
  const [
    {
      options,
      selected,
      quantity,
      total,
      decrementDisabled,
      incrementDisabled,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  //use the useEffect Hook to call it once when the component is mounted
  useEffect(() => {
    dispatch({ type: "init" });
  }, []);

  return (
    <Fragment>
      <section>
        <button
          disabled={decrementDisabled}
          onClick={() => dispatch({ type: "decrementQuantity" })}
        >
          -
        </button>
        <button
          disabled={incrementDisabled}
          onClick={() => dispatch({ type: "incrementQuantity" })}
        >
          +
        </button>
        <input readOnly value={quantity} />
      </section>
      <section>
        <select
          value={selected}
          onChange={(e) => dispatch({ type: "selectItem", id: e.target.value })}
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </section>
      <section>
        <strong>{total}</strong>
      </section>
    </Fragment>
  );
}


// Using a reducer function is helpful when you want to keep your component state together as a single object so that you can update it more easily when the updates are complex due to dependencies.