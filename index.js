var Hapi = require('hapi');
var SocketIO = require('socket.io'), io;
var options = {};


// Create a server with a host and port
var server = Hapi.createServer('0.0.0.0', 8000, options);

var lastPosition = {'nowhere': {name: 'nowhere', date: new Date()}};
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

},
{
    method: 'GET',
    path: '/updatePosition/',
    handler: function (request, reply) {
        if (request.query.name) {
            if (request.query.entry == 1) {
                updatePosition(request.query.name, new Date(Date.parse(request.query.date)));
            } else {
                lastPosition[request.query.name] = {}
                var maxPos = getLatestPosition();
                if (maxPos.date) {
                    updatePosition(maxPos.name, maxPos.date);
                }

            }
        }
        reply({"position": lastPosition[request.query.name]});
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

function getLatestPosition() {
    var maxPos = null;
    //search latest entry
    for (var key in lastPosition) {
        var obj = lastPosition[key];
        if (!maxPos || obj.date > maxPos.date) {
            maxPos = obj;
        }
    }
    return maxPos;
}

function updatePosition(name, date) {
    lastPosition[name] = {name: name, date: date};
    io.sockets.emit("position", {name: lastPosition[name].name, date: lastPosition[name].date.toDateString() + " " + lastPosition[name].date.toTimeString()});
    console.log(lastPosition);
}

// Start the server
server.start(function () {
    io = SocketIO.listen(server.listener);
    io.sockets.on('connection', function(socket) {
        var maxPos = getLatestPosition();
        if (maxPos && maxPos.date) {
            io.sockets.emit("position", {name: maxPos.name, date: maxPos.date.toDateString() + " " + maxPos.date.toTimeString()});
        }
    });
    io.set('log level', 1);
});
