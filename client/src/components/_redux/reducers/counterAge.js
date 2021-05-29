import { _reducersActions } from '../constants';


const initialState = {
    age: 21
}

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    if (action.type === _reducersActions.counter.onAgeUp) {
        newState.age = newState.age + action.value;
    }
    if (action.type === _reducersActions.counter.onAgeDown) {
        //newState.age--;
        newState.age = newState.age - action.value;
    }
    return newState;
}


export default reducer;