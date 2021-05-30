import counterWeight from './counterWeight';
import counterAge from './counterAge';
import SaveLogin from './saveLogin';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    counterAge: counterAge,
	counterWeight: counterWeight,
	SaveLogin:SaveLogin


}
)

export default allReducers;