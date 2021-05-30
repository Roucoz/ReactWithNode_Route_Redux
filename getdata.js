function getComp(req, res) {
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'sa',
        password: 'P@ssw0rd',
		server: '192.168.1.5',
		database: 'mallbegium',
		trustServerCertificate: true
    };

    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from users', function (err, recordset) {

            if (err) console.log(err)

            // send records as a response
            res.send(recordset);

        });
    });
}




module.exports.getComp = getComp;
