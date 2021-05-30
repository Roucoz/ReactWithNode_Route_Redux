import { _reducersActions as _RA } from '../constants';


const initialState = {
    weight: 21
}

const reducer = (state = initialState, action) => {
    const newState = { ...state };
	//console.log('old Weight: ' ,newState)
    if (action.type === _RA.counterWeight.onWeightUp) {
        newState.weight = newState.weight + action.value ;
    }
    if (action.type === _RA.counterWeight.onWeightDown) {
        //newState.age--;
        newState.weight = newState.weight - action.value ;
	}
	//console.log('new Weight:',newState)
    return newState;
}


export default reducer;