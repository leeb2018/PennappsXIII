var geocoder = new google.maps.Geocoder();
var service = new google.maps.DistanceMatrixService;

var list = {};
$.get("https://api.phila.gov/bike-share-stations/v1", function(res) {
    var stops = res["features"];
    for(stop in stops) {
      list[stops[stop]['properties']['name']] = stops[stop]['geometry']['coordinates'];
    };
}, "json");
  
var keys;

function getDirection(map, o, d) {
  keys = Object.keys(list);
  var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });
  
   var zero = new google.maps.Marker ({
    position: getCoord(0),
    title: 0 });
  var one = new google.maps.Marker ({
    position: getCoord(1),
    title: 1 }); 
  var two = new google.maps.Marker ({
    position: getCoord(2),
    title: 2 });
  var three = new google.maps.Marker ({
    position: getCoord(3),
    title: 3 });
  var four = new google.maps.Marker ({
    position: getCoord(4),
    title: 4 });
  var five = new google.maps.Marker ({
    position: getCoord(5),
    title: 5 });
  var six = new google.maps.Marker ({
    position: getCoord(6),
    title: 6 });
  var seven = new google.maps.Marker ({
    position: getCoord(7),
    title: 7 });
  var eight = new google.maps.Marker ({
    position: getCoord(8),
    title: 8 });
  var nine = new google.maps.Marker ({
    position: getCoord(10),
    title: 10 });

  // Put markers on map
  zero.setMap(map);
  one.setMap(map);
  two.setMap(map);
  three.setMap(map);
  four.setMap(map);
  five.setMap(map);
  six.setMap(map);
  seven.setMap(map);
  eight.setMap(map);
  nine.setMap(map);

  // InformationOption and InformationWindows for each marker
  var izero = {
    content: "1401 John F. Kennedy Blvd." 
            + " Accident Rate: 0.0"};
  var wzero = new google.maps.InfoWindow(izero);
  google.maps.event.addListener(zero,'click',function(e){
    wzero.open(map, zero);
  });

  var ione = {
    content: "191 S. 2nd St."
    + " Crime Rate: 18.5" };
  var wone = new google.maps.InfoWindow(ione);
  google.maps.event.addListener(one,'click',function(e){
    wone.open(map, one);
  });

  var itwo = {
    content: "246 S. 40th St." 
    + " Crime Rate: 4.3"};
  var wtwo = new google.maps.InfoWindow(itwo);
  google.maps.event.addListener(two,'click',function(e){
    wtwo.open(map, two);
  });

  var ithree = {
    content: "328 S. 11th St."
    + " Crime Rate: 8.6" };
  var wthree = new google.maps.InfoWindow(ithree);
  google.maps.event.addListener(three,'click',function(e){
    wthree.open(map, three);
  });

  var ifour = {
    content: "1076 Berks St."
    + " Crime Rate: 21.7" };
  var wfour = new google.maps.InfoWindow(ifour);
  google.maps.event.addListener(four,'click',function(e){
    wfour.open(map, four);
  });

  var ifive = {
    content: "3318 Market St."
    + " Crime Rate: 25.8" };
  var wfive = new google.maps.InfoWindow(ifive);
  google.maps.event.addListener(five,'click',function(e){
    wfive.open(map, five);
  });

  var isix = {
    content: "1483 Spruce St."
    + " Crime Rate: 8.6" };
  var wsix = new google.maps.InfoWindow(isix);
  google.maps.event.addListener(six,'click',function(e){
    wsix.open(map, six);
  });

  var iseven = {
    content: "3801 Lancaster Avenue." 
    + " Crime Rate: 11.9"};
  var wseven = new google.maps.InfoWindow(iseven);
  google.maps.event.addListener(seven,'click',function(e){
    wseven.open(map, seven);
  });

  var ieight = {
    content: "807 S. 21st St."
    + " Crime Rate: 16.1" };
  var weight = new google.maps.InfoWindow(ieight);
  google.maps.event.addListener(eight,'click',function(e){
    weight.open(map, eight);
  });

  var inine = {
    content: "2090 Winter St."
    + " Crime Rate: 38.7" };
  var wnine = new google.maps.InfoWindow(inine);
  google.maps.event.addListener(nine,'click',function(e){
    wnine.open(map, nine);
  });

  var start = closestStop(o);
  var end = getCoord(5);

  // Set destination, origin and travel mode.
  var request = {
    destination: end,
    origin: start,
    travelMode: google.maps.TravelMode.BICYCLING
  };

  //Pass the directions request to the directions service.
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // Display the route on the map.
      directionsDisplay.setDirections(response);
    }
  });
};


function getDistance(o, d) {
  service.getDistanceMatrix({
    origins: [o],
    destinations: [d],
    travelMode: google.maps.TravelMode.BICYCLING,
    unitSystem: google.maps.UnitSystem.METRIC
  }, function(response, status) {
    if(status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    }
    else {
      return response['rows'][0]['elements'][0]['distance']['value'];
    }
  })
}

function getCoord(i) {
  return {lat: list[keys[i]][1], lng: list[keys[i]][0]}
}

function closestStop(o) {
  var key, coord, distance;
  var closest = keys[0];
  var minDistance = getDistance(o, getCoord(0));
  var closestCoord = getCoord(0);
  for(var i = 1; i < 10; i++) {
    coord = getCoord(i);
    distance = getDistance(o, coord);
    if (distance < minDistance) {
      minDistance = distance;
      closest = list[keys[i]];
      closestCoord = coord;
    }
  }
  return closestCoord;
}