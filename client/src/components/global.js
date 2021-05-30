import '../styles/glob.css';
const nodeServerSite = 'http://localhost:5000/'

//#region Constants
export const userType = ['Mall Admin', 'Super User', 'Customer']
//#end region



export const log = (a, b) => {
	console.log(a, b!==undefined?b:'');
}




//#region getData 

export async function getdatawithWait( servicename, params,  log = false) {
	//how to use it
	//var deetee = await G.getdatawithWait( 'getlogin', [['username', 'roucoz'], ['password', 'cl@r@']], true);
	
	var bodies = ""
	for (var i = 0; i < params.length; i++) {
		bodies += '&' + params[i][0] + '=' + (params[i][1] === "" ? "" : params[i][1])

	}
	if (bodies.length > 2) bodies = bodies.substring(1);
	if (log) log('Bodies', bodies);
	const link = nodeServerSite + servicename + "/"
	if (log) log('link', link);
	if (log) log('full path', link + '?' + bodies);
	let response = await fetch(link, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',

		},

		body: bodies
	})
	let data = response.json()
	if (log) log('Data' , data);
	return data;
}
//#endregion 
 