var command = {};
command.socket = null;
command.isopen = false;
command.server = "127.0.0.1";
command.port = "9000";
command.name = null;

command.connect = function connect() {
	console.log("Init connection to server "+this.server);
	this.socket = new WebSocket("ws://"+this.server+":"+this.port);
	this.socket.binaryType = "arraybuffer";

	this.socket.onopen = function() {
	   console.log("Connected to server");
	   command.isopen = true;
	}

	this.socket.onmessage = function(e) {
	   if (typeof e.data == "string") {
		  console.log("Text message received: " + e.data);
	   } else {
		  console.log("WARNING : Unexpected binary message received");
	   }
	}

	this.socket.onclose = function(e) {
	   console.log("Connection with server closed.");
	   command.socket = null;
	   command.isopen = false;
	}
};

command.sendText = function sendText(text) {
	if (command.isopen) {
	   command.socket.send(text);
	   console.log("send : "+text);               
	} else {
	   console.log("WARNING : Connection not opened.");
	}
};

command.sendName = function sendName(name) {
	this.name = name;
	this.sendText("Connect;"+name);
}

command.connect();
