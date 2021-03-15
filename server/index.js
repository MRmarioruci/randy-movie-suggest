/* Libraries */
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisClient  = redis.createClient();
const http = require("http").Server(app);
const mysql = require('mysql');
const router = express.Router();

/**Local classes and utilities */
const controlSuggest = require('./controller/Suggest');
//const RegistryClass = require('./classes/Registry');
//const Registry = new RegistryClass();
//const SocketHandler = require('./classes/Socket.js');

/* Vars */
const redisPort = 6379;
const port = 5005;
const dbConfig = {
	connectionLimit : 10,
	host     : 'localhost',//process.env.SQL_HOST,
	user     : 'mario',//process.env.SQL_USER,
	password : 'smilemalaka',//process.env.SQL_PASSWORD,
	database : 'randy',//process.env.SQL_DATABASE,
	charset  : 'utf8mb4'
};
const CONNECTION = mysql.createPool(dbConfig);

app.get('/', (req,res)=>{
	res.json('Hello');
})
app.use(session({
    secret: 'secret',
    store: new redisStore({ host: 'localhost', port: redisPort, client: redisClient}),
    saveUninitialized: false,
    resave: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

http.listen(port,() => {
	console.log(`Server started on port ${port}`);
	controlSuggest.run(app, CONNECTION);
})
process.on('SIGTERM', function () {
	process.exit(0);
});