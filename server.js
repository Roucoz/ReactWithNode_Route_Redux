const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization ");
    next();
})

//#region SQL server 
var sql = require("mssql");
// config for your database
const config = {
    user: 'sa',
    password: 'RimP@ssw0rd',
    server: '192.168.0.26',
    database: 'roucozdb',
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
const writeDataToSQLServer = (str, res) => {
    sql.connect(config, function (err) {
        if (err) console.log(err)
        var request = new sql.Request();
        request.query(str, (err, recordset) => {
            if (err) console.log(err)
            res.send(recordset.rowsAffected)

        })

    }
    )


}
//#endregion

//#region Handeling Session Tokens

//the bellow command has been generated once to run secret Token
//console.log(require('crypto').randomBytes(64).toString('hex')) 

const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
    return jwt.sign({ id: username }, process.env.TOKEN_SECRET, { expiresIn: 10800 });
}
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']
    console.log('Roucoz', token)
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

//#endregion

//#region Mailchimp integration






app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.post('/getUsers', authenticateToken, (req, res) => {

    getDataFromSQLServer('select * from users', res)
}
)
getSQLColumnValue = (columnValue, includequotes = true) => {
    if (!columnValue) return 'null';
    if (columnValue === 'undefined') return 'null';
    columnValue = columnValue.replace("'", "");
    if (includequotes) columnValue = "'" + columnValue + "'"
    console.log(columnValue)
    return columnValue
}
app.post("/registerUser", (req, res) => {
    str = "insert into userRegistration(id, code, storeName, city, address, addAddress, contactPerson, Phone, mobile)Values((select isnull(max(id),0)+1 from userRegistration), "
    str += getSQLColumnValue(req.body.code) + ", "
    str += getSQLColumnValue(req.body.storeName) + ", "
    str += getSQLColumnValue(req.body.city) + ", "
    str += getSQLColumnValue(req.body.address) + ", "
    str += getSQLColumnValue(req.body.addAddress) + ", "
    str += getSQLColumnValue(req.body.contactPerson) + ", "
    str += getSQLColumnValue(req.body.phone) + ", "
    str += getSQLColumnValue(req.body.mobile) + ") "
    if (req.body.log !== undefined) console.log(str)
    writeDataToSQLServer(str, res)


})


app.post('/SignIn', function (req, res) {   //create web server
    const token = generateAccessToken(req.body.code)
    var str = "select isnull(a.id,0) as id ,isnull(a.code,'') as code ,isnull(a.name,'') as name ,a.createDate,isnull(a.userType,0) as userType  "
    str += ",'" + token + "' Token "
    str += ' from users a '
    str += "where code = '" + req.body.code + "' and pwd ='" + req.body.pwd + "'"
    if (req.body.log !== undefined) console.log(str)

    getDataFromSQLServer(str, res)
})







app.listen(port, () => console.log(`Listening on port ${port}`));