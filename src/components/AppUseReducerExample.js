import React, { Fragment, useReducer} from 'react';


// the state argument is the current state of the component. The action argument is the argument that's passed to dispatch(). The action.type value is used to determine what to do. 
// This reducer only has two possible actions: changeName and changeAge. Based on this we use the object spresad operator to return a new state object made from the existing state and the updated state object values. In this case, based on the action.type value. Either the name or age state values will be updated.
// important to have a default handler in place that throws an error when an unexpected action is passed to the reducer. Highly likely you will get it wrong at some point - betterto have the reducer complain loudly about invalid actions.

function reducer(state, action) {
    switch (action.type) {
        case 'changeName':
            return {...state, name: action.value};
            case 'changeAge':
                return {...state, age: action.value};
                default: 
                throw new Error (`${action.type} is not a valid action`)
    }
}

//App Component renders two fields and two labels. When input value changes it updates corresponding label value,done by using two pieces of stte, one for each field. State is set up using the useReducer () hook.
// The useReducer function takes two arguments, the reducer function that updates the state and the initial state of the component. The return value of the useReducer() is an array with the state as the first element and the dispatcher function as the second. When we use reducers we only have one object as the state of the component, instead of several smaller unrelated state values. That is why we are destructitring the state object into name and age constants.

export default function App() {
    const [{ name, age}, dispatch] = useReducer(reducer, {});

    return (
        <Fragment>
            <input placeholder="Name" value={name} onChange={e => dispatch({ type: 'changeName', value: e.target.value})}/>
            <p> Name: {name}</p>
            <input placeholder="Age" type="number" value={age} onChange={e => dispatch({type: 'changeAge', value: e.target.value})} />
            <p> Age: {age} </p>
                    </Fragment>
    )
}