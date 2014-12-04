if(window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', processOrientation, false);
	} else {
		// Le navigateur ne supporte pas l'événement deviceorientation
		console.log("WARNING : your browser does not support deviceorientation");
	}
	
	if(window.DeviceMotionEvent) {
		window.addEventListener("devicemotion", processMotion, false);
	} else {
		// Le navigateur ne supporte pas l'événement devicemotion
		console.log("WARNING : your browser does not support devicemotion");
	}
	

function processOrientation(event) {
  var alpha = event.alpha;
  var beta = event.beta;
  var gamma = event.gamma;
  document.getElementById("log").innerHTML = "<ul><li>Alpha : " + alpha + "</li><li>Beta : " + beta + "</li><li>Gamma : " + gamma + "</li></ul>"; 
  command.sendText("Orientation;"+command.name+";"+alpha+";"+beta+";"+gamma);
};

function processMotion(event) {
  var alpha = event.alpha;
  var beta = event.beta;
  var gamma = event.gamma;
  document.getElementById("log").innerHTML = "<ul><li>Alpha : " + alpha + "</li><li>Beta : " + beta + "</li><li>Gamma : " + gamma + "</li></ul>"; 
  command.sendText("Motion;"+command.name+";"+alpha+";"+beta+";"+gamma);
};