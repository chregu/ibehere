/** @jsx React.DOM */

var ibehere = React.createClass({
    getInitialState: function() {
        return {data: {"start": { name: "unknown", date: "unknown"}}};
    },

    render: function() {
        return (
        <div>
        Last known positions of chregu are
        <positions data={this.state.data}/>
        </div>

        );
    },
    componentWillMount: function() {
        var socket = io.connect();
        var self = this;
        socket.on('position', function (data) {
            self.handlePositionUpdate(data);
        });
    },

    handlePositionUpdate: function(position) {
        this.setState({data: position});
    }
});

var position = React.createClass({

    render: function() {
        return (
            <div>
                Place2: {this.props.name}<br/>Time: {this.props.time}
            </div>
            );
    }
});

var positions = React.createClass({

    render: function() {
        var positionNodes = [];
        for (var key in this.props.data) {
            var pos = this.props.data[key];
            if (pos.name) {
                positionNodes.push(<position key={pos.name} name={pos.name} time={pos.readabledate}/>)
            }
         };

        return (
            <div className="positions">
            {positionNodes}
            </div>
         );
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

