const express = require('express');
// const app = require('express')();  korotkaya zapis
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('./config/db');

const router = express.Router();

const comments = require('./routes/comments')(router);

const io = require('socket.io')(http);

mongoose.connect(db.uri, {
    // useMongoClient: true
}, (err) => {
    if (err) {
        console.log('EROR! db not connect: ', err);
    } else {
        console.log('Connected to DB');
    }
});


// middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/client/'));
app.use('/comments', comments);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('new-message', (message) => {
        io.emit('new-message', message);
    });
});

// server
http.listen(3000, () => {
    console.log('listening on :3000');
});
