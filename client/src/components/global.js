import '../styles/glob.css';
import { Form } from 'react-bootstrap';
import { resetWarningCache } from 'prop-types';

const nodeServerSite = 'http://localhost:5000/';


//#region Constants
export const userType = ['Mall Admin', 'Super User', 'Customer']
export const sessionStorageVariables = { userData: 'UserData' }
export const errorColor = '#ea0505'
//#endregion

//#region Distinct Functions
export const log = (a, b) => {
    console.log(a, b !== undefined ? b : '');
}
export const isValideEmail = (mail) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    return (false)
}
export const checkUserAccess = () => {
    if (!JSON.parse(sessionStorage.getItem('UserData'))) { return false }

    if (!JSON.parse(sessionStorage.getItem('UserData')).Token) { return false }
    if (JSON.parse(sessionStorage.getItem('UserData')).Token === "") { return false }
    return true
}
///loop over object Object.keys(obj).forEach(function(key) {console.log(key, obj[key]);});
//#endregion

//#region getData 

export async function getdatawithWait(servicename, params, Token = '', logs = false) {
    var bodies = ""
    for (var i = 0; i < params.length; i++) {
        bodies += '&' + params[i][0] + '=' + (params[i][1] === "" ? "" : params[i][1])

    }
    if (bodies.length > 2) bodies = bodies.substring(1);
    if (logs) log('Bodies', bodies);
    const link = nodeServerSite + servicename + "/"
    if (logs) log('link', link);
    if (logs) log('full path', link + '?' + bodies);
    let response = await fetch(link, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': Token

        },

        body: bodies
    })
	let data = response.json()
	let status = response.status;
    if (logs) log('Data', data);
    return data;
}
export async function getData(servicename, params, Token = '', logs = false) {
    var bodies = ""
    for (var i = 0; i < params.length; i++) {
        bodies += '&' + params[i][0] + '=' + (params[i][1] === "" ? "" : params[i][1])

    }
    if (bodies.length > 2) bodies = bodies.substring(1);
    if (logs) log('Bodies', bodies);
    const link = nodeServerSite + servicename + "/"
    if (logs) log('link', link);
    if (logs) log('full path', link + '?' + bodies);
    
    
	let response = await fetch(link, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			'authorization': Token

		},

		body: bodies
	})
	let data = response.json()
	let status = response.status;
	if (logs) log('Data', data);
	
	return {data,status};
}


//#endregion 



//#region RenderComponent
export const renderTextField = (name, type, placeHolder, onChange, valueField, errorArray) => {
    var key = name.replace(" ", "").toLowerCase();
    return (
        <Form.Group className='fullWidth '>
            <Form.Label htmlFor={key} >{name}</Form.Label>
            <Form.Control style={errorArray[key] ? { borderColor: errorColor } : {}} name={key} type={type} placeholder={placeHolder} onChange={onChange} value={valueField[key] || ''} />
            {errorArray[key] && <div className='remarks notValidColor'>{errorArray[key]}</div>}
        </Form.Group>
    )
}
//#endregion