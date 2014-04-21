/** @jsx React.DOM */

var ibehere = React.createClass({
    getInitialState: function() {
        return {lastPosition: "unknown", lastDate: "unknown"};
    },

    render: function() {
        return (
        <div>
        Last known position of chregu is <br/>Place: {this.state.lastPosition}<br/>Time: {this.state.lastDate}
            </div>

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
<div>
<h1>I be here!</h1>
<ibehere />
</div>

,
document.getElementById('body')
);

