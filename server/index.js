/* Libraries */
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisClient  = redis.createClient();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql');
const router = express.Router();

/* Controllers */
const controlSuggest = require('./controller/Suggest');
const controlUser = require('./controller/User');
const controlChat = require('./controller/Chat');

/* Vars */
const redisPort = 6379;
const port = 5005;
const dbConfig = {
	connectionLimit : 10,
	host     : 'localhost',//process.env.SQL_HOST,
	user     : 'mario',//process.env.SQL_USER,
	password : '',//process.env.SQL_PASSWORD,
	database : 'randy',//process.env.SQL_DATABASE,
	charset  : 'utf8mb4'
};
const CONNECTION = mysql.createPool(dbConfig);

app.get('/', (req,res)=>{
	res.json(`Hey... You shouldn't be here`);
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
	io.on('connection', socket => {
		console.log('Connected to websockets');
		socket.on('event', data => { /* … */ });
		socket.on('disconnect', () => { /* … */ });

		controlSuggest.run(app, socket, CONNECTION);
		controlUser.run(app, socket, CONNECTION);
		controlChat.run(app, socket, CONNECTION);
	});
})
process.on('SIGTERM', function () {
	process.exit(0);
});