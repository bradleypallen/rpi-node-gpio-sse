var gpio = require('gpio');
var gpio11 = gpio.export(11, 'in');

exports.index = function(req, res){
  res.render('index', { title: 'RPi Node.js SSE+GPIO Demo' });
};

exports.stream = function(req, res) {
    var count = 1;
    req.socket.setTimeout(Infinity);
    res.contentType('text/event-stream');
    res.header('Cache-Control', 'no-cache');
    res.header('Connection', 'keep-alive');
    gpio11.on('valueChange', function() {
	var now = new Date();
	res.send("data: Button press #" + count++ + ' @ ' + now + '\n\n');
    });
};

