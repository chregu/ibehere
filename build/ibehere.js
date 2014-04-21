/** @jsx React.DOM */

var ibehere = React.createClass({displayName: 'ibehere',
    getInitialState: function() {
        return {lastPosition: "unknown"};
    },

    render: function() {
        return (
        React.DOM.div(null, 
        "Last position of chregu is: ", this.state.lastPosition
            )

        );
    },
    componentWillMount: function() {
        var socket = io.connect();
        var self = this;
        socket.on('position', function (data) {
            self.handlePositionUpdate(data.name);
        });
    },

    handlePositionUpdate: function(position) {
        this.setState({lastPosition: position});
    }
});


React.renderComponent(
React.DOM.div(null, 
React.DOM.h1(null, "Hello, world!"),
ibehere(null )
)

,
document.getElementById('body')
);

