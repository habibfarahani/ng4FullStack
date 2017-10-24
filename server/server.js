// const express = require('express');
// const path = require('path');
// const app = express();
// const http = require('http');



// const port = 8000;

// // Find index.html in public folder (in this case src)
// app.use(express.static(path.join(__dirname, "src")));
// const server = http.createServer(app);
// const io = require('socket.io').listen(server);


// // start the node server
// server.listen(port, '192.168.0.5', () => {
//     console.log('Listeninig on port' + port);
// });




const util = require('util')


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();

// Array of connections made by client.
connections = [];

//API file for Mongodb interaction
//const api = require('./server/routes/api');

//Setup body parser middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder  (*All angular stuff front end will go here)
app.use(express.static(path.join(__dirname, '../client/dist')));

// API location
//app.use('/api', api);



// send all other requests to angular appll
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = '8000'; //process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io').listen(server);




io.on('connection', (socket) => {

    connections.push(socket);
    console.log('new connection made ' + connections.length);

    // Test Messages
    socket.on('message', (data) => {
        console.log('in server ' + data.msg);
    });

    // Test Messages
    socket.on('monitor', (data) => {
        console.log('in server ' + data.msg);
    });


    // Test Messages
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected -- ' + connections.length);
    });


    //    socket.emit('message', { msg: 'Server To client----' });
    /*
        setInterval(() => {
            console.log('data injection from server');
            data = [];

            message = {
                'id': 'chart-data',
                'data': [{
                        'title': 'chart 1',
                        'point': 0,
                    },
                    {
                        'title': 'chart 2',
                        'point': 0,
                    },
                    {
                        'title': 'chart 3',
                        'point': 0,
                    },
                    {
                        'title': 'chart 4',
                        'point': 0,
                    },

                ]
            };

            console.log(message.data.length);

            for (var i = 0; i < message.data.length; i++) {
                message.data[i].point = Math.floor((Math.random() * 10) + 1);
            }

            socket.emit('monitor-packets', message); //{ msg: 'Server To client----' });
            // what about?
            // socio.sockets.emitket.emit('message', { msg: 'Server To client----' });

        }, 10000);
    */
    console.log(util.inspect(network, { showHidden: false, depth: null }));
    var os = require('os');
    var network = os.networkInterfaces()
    var ipconfig = {
        'ipconfig': network,
        'dns': require('dns').getServers(),
        'hostname': require('os').hostname(),
//        'iproute': require('netroute').getInfo(),

    };



    //    console.log('local network\n' + util.inspect(require('netroute').getInfo(), { showHidden: true, depth: null }));
    //    console.log('local network\n' + util.inspect(network, { showHidden: true, depth: null }));
    console.log('local network\n' + util.inspect(ipconfig, { showHidden: true, depth: null }));



    //    console.log('Interfaces keys\n' + util.inspect(interfaceNames, { showHidden: false, depth: null }));

    //    socket.emit('dash-data', interfaceNames); //{ msg: 'Server To client----' });
    socket.emit('dash-data', ipconfig); //{ msg: 'Server To client----' });


    var fs = require('fs');

    fs.readFile('/proc/net/route', (err, data) => {
        if (!err) {
            console.log('IGMP: ', data.toString().split('\n').splice(0, 4));

        } else {
            console.log('Could not read /proc/net/igmp')
        }

    });

    //    socket.emit('dash-data', { name: 'Dummy Message', flag: 'no flag' }); //{ msg: 'Server To client----' });

});





//process.nextTick(() => { console.log('calling firmwareModule') }, 'register');

server.listen(port, '172.22.216.102', () => console.log(`Running on local host: ${port}`));
//server.listen(port, '192.168.0.5', () => console.log(`Running on local host: ${port}`));
//server.listen(port, '10.64.57.24', () => console.log(`Running on local host: ${port}`));
//server.listen(port, '10.67.92.107', () => console.log(`Running on local host: ${port}`));
