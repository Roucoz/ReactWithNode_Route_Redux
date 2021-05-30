const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

//#region SQL server 
var sql = require("mssql");
// config for your database
const config = {
	user: 'sa',
	password: 'P@ssw0rd',
	server: '192.168.1.5',
	database: 'mallbegium',
	trustServerCertificate: true
};
const getDataFromSQLServer = (str, res) => {
	sql.connect(config, function (err) {

		if (err) console.log(err);

		// create Request object
		var request = new sql.Request();
		request.query(str, function (err, recordset) {
	
			if (err) console.log(err)
			// send records as a response
			res.send(recordset.recordset);

		});
	})
}
//#endregion




	app.get('/api/hello', (req, res) => {
		res.send({ express: 'Hello From Express' });
	});

	app.post('/api/world', (req, res) => {
		console.log(req.body);
		res.send(
			`I received your POST request. This is what you sent me: ${req.body.post}`,
		);
	});

	app.get('/getUsers', function (req, res) {
		getDataFromSQLServer("select * from users",res)}
	)

	app.post('/PostUsers', function (req, res) {   //create web server
		var str = "select isnull(a.id,0) as id ,isnull(a.code,'') as code ,isnull(a.name,'') as name ,isnull(a.pwd,'') as pwd ,a.createDate,isnull(a.userType,0) as userType  from users a where "
		str += "  code = '" + req.body.code + "' and pwd ='" + req.body.pwd + "'"
		if (req.body.log!==undefined) console.log(str)
		
		getDataFromSQLServer(str, res)
	})
		



	app.listen(port, () => console.log(`Listening on port ${port}`));