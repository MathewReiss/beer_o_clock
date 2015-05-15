Pebble.addEventListener("ready", function(){
	var next_friday = new Date();
	if(next_friday.getDay() !== 5){
		while(next_friday.getDay() !== 5){
			next_friday.setTime(next_friday.getTime() + 1000*60*60*24);
		}
	}
	next_friday.setHours(16);
	next_friday.setMinutes(30);
	
	for(var i = 0; i < 10; i++){
		//console.log("Raw: " + next_friday);
		if(i !== 0) next_friday.setTime(next_friday.getTime() + 1000*60*60*24*7);

		//console.log("Final: " + next_friday);
		var beer_pin = {
			"id" : "beer_pin-"+i,
			"time": next_friday,
			"duration": 60,
			"layout": {
				"title": "Happy Hour!",
				"type": "genericPin",
				"tinyIcon": "system://images/GENERIC_SMS",
				"largeIcon":"system://images/GENERIC_SMS",
				"body": "It's been a long week. Time for a beer!",
				"foregroundColor": "#FFFFFF",
				"backgroundColor": "#AA5500"
			}
		};
		insertUserPin(beer_pin, null);
		console.log("Beer pin inserted at: " + next_friday.getMonth() + ", " + next_friday.getDate());
	}
});

/******************************* timeline lib *********************************/

// The timeline public URL root
var API_URL_ROOT = 'https://timeline-api.getpebble.com/';

/**
 * Send a request to the Pebble public web timeline API.
 * @param pin The JSON pin to insert. Must contain 'id' field.
 * @param type The type of request, either PUT or DELETE.
 * @param callback The callback to receive the responseText after the request has completed.
 */
function timelineRequest(pin, type, callback) {
  // User or shared?
  var url = API_URL_ROOT + 'v1/user/pins/' + pin.id;

  // Create XHR
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    console.log('Timeline: response received: ' + this.responseText);
  };
  xhr.open(type, url);

  // Get token
  Pebble.getTimelineToken(function(token) {
    // Add headers
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-User-Token', '' + token);

    // Send
    xhr.send(JSON.stringify(pin));
    console.log('Timeline: Request sent');
  }, function(error) { console.error('Timeline: Error getting timeline token: ' + error); });
}

/**
 * Insert a pin into the timeline for this user.
 * @param pin The JSON pin to insert.
 * @param callback The callback to receive the responseText after the request has completed.
 */
function insertUserPin(pin, callback) {
  timelineRequest(pin, 'PUT', callback);
}