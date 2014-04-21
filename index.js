var Hapi = require('hapi');
var SocketIO = require('socket.io'), io;
var internals = {};

var options = {
};


// Create a server with a host and port
var server = Hapi.createServer('0.0.0.0', 8000, options);

var lastPosition = {name: 'unknown on server'};
var io;


// Add the route
server.route([
{

    method: 'GET',
    path: '/build/{path*}',
    handler: {
        directory: { path: './build', listing: false, index: true }
    }

},
{

    method: 'GET',
    path: '/libraries/{path*}',
    handler: {
        directory: { path: './libraries', listing: false, index: true }
    }

},{
    method: 'GET',
    path: '/updatePosition/',
    handler: function (request, reply) {
        if (request.query.name) {
            updatePosition(request.query.name);
        }
        reply({"position": lastPosition});
    }
},
{

    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './templates', listing: false, index: true }
    }
}
]
);

function updatePosition(name) {
    lastPosition = name;
    io.sockets.emit("position", {name: lastPosition});
}

// Start the server
    server.start(function () {

        io = SocketIO.listen(server.listener);
        io.sockets.on('connection', function(socket) {
            socket.emit("position", {name: lastPosition});
        });
    });
