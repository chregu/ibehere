/** @jsx React.DOM */

var ibehere = React.createClass({displayName: 'ibehere',
    getInitialState: function() {
        return {data: {"start": { name: "unknown", date: "unknown"}}};
    },

    render: function() {
        return (
        React.DOM.div(null, 
        "Last known positions of chregu are",
        positions( {data:this.state.data})
        )

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

var position = React.createClass({displayName: 'position',

    render: function() {
        return (
            React.DOM.div(null, 
                "Place2: ", this.props.name,React.DOM.br(null),"Time: ", this.props.time
            )
            );
    }
});

var positions = React.createClass({displayName: 'positions',

    render: function() {
        var positionNodes = [];
        for (var key in this.props.data) {
            var pos = this.props.data[key];
            if (pos.name) {
                positionNodes.push(position( {key:pos.name, name:pos.name, time:pos.readabledate}))
            }
         };

        return (
            React.DOM.div( {className:"positions"}, 
            positionNodes
            )
         );
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

