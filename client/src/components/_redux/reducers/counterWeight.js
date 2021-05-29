import { _reducersActions as _RA } from '../constants';


const initialState = {
    weight: 21
}

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    if (action.type === _RA.counterWeight.onWeightUp) {
        newState.weight = newState.weight + action.value;
    }
    if (action.type === _RA.counterWeight.counterWeightDown) {
        //newState.age--;
        newState.weight = newState.weight - action.value;
    }
    return newState;
}


export default reducer;