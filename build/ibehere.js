/** @jsx React.DOM */

var ibehere = React.createClass({displayName: 'ibehere',
    getInitialState: function() {
        return {lastPosition: "unknown", lastDate: "unknown"};
    },

    render: function() {
        return (
        React.DOM.div(null, 
        "Last known position of chregu is ", React.DOM.br(null),"Place: ", this.state.lastPosition,React.DOM.br(null),"Time: ", this.state.lastDate
            )

        );
    },
    componentWillMount: function() {
        var socket = io.connect();
        var self = this;
        socket.on('position', function (data) {
            self.handlePositionUpdate(data.name, data.date);
        });
    },

    handlePositionUpdate: function(position, date) {
        this.setState({lastPosition: position, lastDate: date});
    }
});


React.renderComponent(
React.DOM.div(null, 
React.DOM.h1(null, "I be here!"),
ibehere(null )
)

,
document.getElementById('body')
);

