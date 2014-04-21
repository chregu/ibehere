/** @jsx React.DOM */

var ibehere = React.createClass({
    getInitialState: function() {
        return {lastPosition: "unknown"};
    },

    render: function() {
        return (
        <div>
        Last position of chregu is: {this.state.lastPosition}
            </div>

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
<div>
<h1>Hello, world!</h1>
<ibehere />
</div>

,
document.getElementById('body')
);

