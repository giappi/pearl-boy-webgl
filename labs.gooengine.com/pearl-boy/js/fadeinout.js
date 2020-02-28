var opacity = 0.0;
var process;
var target;
function fadeOutProcess() {
	opacity += 0.01;
	document.getElementById('fader').style.opacity = opacity;
	if (opacity >= 1.0) {
		opacity = 1;
		window.location = target;
		target = '';
		clearInterval(process);
	}
}
function fadeInProcess(callback) {
	opacity -= 0.01;
	document.getElementById('fader').style.opacity = opacity;
	if (opacity <= 0.0) {
		opacity = 0;
		document.getElementById('fader').style.opacity = opacity;
		document.getElementById('fader').style.display = 'none';
		clearInterval(process);
		if (callback) callback();
	}
}
function fadeIn(callback) {
	var loader = document.getElementById('loader');
	var fader = document.getElementById('fader');
	loader.style.display = 'none';
	fader.style.display = 'inline';
	//var fade = fadeInProcess.bind(null, callback);
	//process = setInterval(fade,10);
	fade(fader.style, 'opacity', 1.0, 0.0, 1000, function(elem) {
		fader.style.display = 'none';
		if (callback) callback(elem)
	});
}

function fadeOut(redirectTo) {
	opacity = 0;
	var fader = document.getElementById('fader');
	fader.style.display = 'inline';
	target = redirectTo;
	var idx = window.location.href.indexOf('?');
	if(idx > -1) {
		target += window.location.href.slice(idx);
	}
	//process = setInterval(fadeOutProcess,10);
	fade(fader.style, 'opacity', 0.0, 1.0, 1000, function() {
		window.location = target;
	});
}

function fade(obj, prop, startVal, endVal, time, callback) {
	var process;
	function internalCallback(elem) {
		clearInterval(process);
		if (callback) callback(elem);
	}
	
	time = time || 1000;
	var timeStep = 15;
	
	var start = obj[prop] = startVal;
	var step = (endVal - start)* timeStep/time
	var doFade = processFade.bind(null, obj, prop, step, endVal, internalCallback);
	
	process = setInterval(doFade, timeStep);
}

function processFade(obj, prop, step, endVal, callback) {
	var newVal = +obj[prop] + step;
	if (step < 0 && newVal <= endVal || step > 0 && newVal >= endVal) {
		newVal = endVal;
		if (callback) callback(obj);
	}
	obj[prop] = newVal;
}