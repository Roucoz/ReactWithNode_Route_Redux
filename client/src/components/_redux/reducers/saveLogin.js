const initialState = {
	userData: {}
}

const reducer = (state = initialState, action) => {
	const newState = { ...state };
	//console.log('Old UserData  ', newState)
	//console.log('action  ', action.payLoad)
	newState.userData = action.payLoad;
	//console.log('New userData ', newState)
	return newState;
}


export default reducer;