import counterWeight from './counterWeight';
import counterAge from './counterAge';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    counterAge: counterAge,
    counterWeight:counterWeight


}
)

export default allReducers;