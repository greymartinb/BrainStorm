function initMap() {
  var bounds = new google.maps.LatLngBounds();
  var austin = {lat: 30.2672, lng: -97.7431};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: austin,
    zoom: 8
  });

  var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);

  var marker = new google.maps.Marker({
    position: {lat: 30.2672, lng: 97.7431},
    map: map
  });

  var markers = [
    ['Bennu, Austin', 30.279798,-97.719583],
    ['Epoch, Austin', 30.318604,-97.724540],
    ['Radio, Austin', 30.231537,-97.787776],
    ['Mozart, Austin', 30.295245,-97.784398],
    ['Wright, Austin', 30.264564,-97.733129],
    ['Thunder, Austin', 30.284407,-97.719395],
    ['Dominican, Austin', 30.255973,-97.746568],
    ['Figure, Austin', 30.266921,-97.719931]
  ];

  // Info Window Content
  var infoWindowContent = [
    ['<div class="info_content">' + '<h3>Bennu Coffee</h3>' + '<p>Students gather at this chill, cozy 24/7 cafe pouring fair trade cofee drinks, plus light fare.</p>' + '<p><b>Address:</b> 2001 E Martin Luther King Jr Blvd, Austin, TX 78702<br>' + '<p><b>Hours:</b> Open 24 hours</p>' + '<p><b>Phone:</b> (512)478-4700<p>' + '<br><button class="btn btn-default" id="bennuCheckIn" type="button"> Select Location </button></div>'],

    ['<div class="info_content">' + '<h3>Epoch Coffee</h3>' + '<p>24/7 coffee shop vending espresso drinks, sweets & pizza from East Side Pies in open, casual space.</p>' + '<p><b>Address:</b> 221 W N Loop Blvd, Austin, TX 78751<br>' + '<p><b>Hours:</b> Open 24 hours</p>' + '<p><b>Phone:</b> (512)454-3762<p>' + '<br><button class="btn btn-default" id="epochCheckIn" type="button"> Select Location </button></div>'],

    ['<div class="info_content">' + '<h3>Radio</h3>' + '<p>Hip spot for coffee, beer & pastries in wood-paneled digs, plus tables & a taco truck out back.</p>' + '<p><b>Address:</b> 4204 Manchaca Rd, Austin, TX 78704<br>' + '<p><b>Hours:</b> 6:30AM-12AM</p>' + '<p><b>Phone:</b> (512)394-7844<p>' + '<br><button class="btn btn-default" id="radioCheckIn" type="button"> Select Location </button></div>'],

    ['<div class="info_content">' + '<h3>Mozart\'s Coffee Roasters</h3>' + '<p>Beans flame-roasted on-site, plus bakery goods, frequent live music & patio seating on Lake Austin.</p>' + '<p><b>Address:</b> 3825 Lake Austin Blvd, Austin, TX 78703<br>' + '<p><b>Hours:</b> 7AM-12AM</p>' + '<p><b>Phone:</b> (512)477-2900<p>' + '<br><button class="btn btn-default" id="mozartCheckIn" type="button"> Select Location </button></div>'],

    ['<div class="info_content">' + '<h3>Wright Bros Brew &amp; Brew</h3>' + '<p>Full espresso bar ideal for getting work done because it offers exceptional lighting, Wi-Fi, and plenty of food and drink options.</p>' + '<p><b>Address:</b> 500 San Marcos St 105, Austin, TX 78702<br>' + '<p><b>Hours:</b> 8AM-12AM</p>' + '<p><b>Phone:</b> (512)493-0963<p>' + '<br><button class="btn btn-default" id="wrightCheckIn" type="button"> Select Location </button></div>'],

    ['<div class="info_content">' + '<h3>Thunderbird Coffee</h3>' + '<p>Locally owned cafe that specializes in high-quality, direct-trade coffee and craft beers. Offers free Wi-Fi as well as plenty of seating and electrical outlets.</p>' + '<p><b>Address:</b> 2200 Manor Road, Austin, TX 78722<br>' + '<p><b>Hours:</b> 6:30--10AM</p>' + '<p><b>Phone:</b> (512)472-9900<p>' + '<br><button class="btn btn-default" id="thunderCheckIn" type="button"> Select Location </button></div>'],

    ['<div class="info_content">' + '<h3>Dominican Joe</h3>' + '<p>Plenty of seating, outlets, ample lighting, and music that doesn\'t overpower your own.</p>' + '<p><b>Address:</b> 515 S Congress Ave, Austin, TX 78704<br>' + '<p><b>Hours:</b> Monday-Friday: 6:30AM-11PM, Saturday & Sunday: 7:00AM-11:00PM</p>' + '<p><b>Phone:</b> (512)448-3919<p>' + '<br><button class="btn btn-default" id="dominicanCheckIn" type="button"> Select Location </button></div>'],

    ['<div class="info_content">' + '<h3>Figure 8 Coffee Purveyors</h3>' + '<p>Inviting coffee shop that offers ideal atmosphere and layout for getting work done. Plenty of natural sunlight, free Wi-Fi and a friendly staff.</p>' + '<p><b>Address:</b> 515 S Congress Ave, Austin, TX 78704<br>' + '<p><b>Hours:</b> 7AM-10PM </p>' + '<p><b>Phone:</b> (512)953-1061<p>' + '<br><button class="btn btn-default" id="figureCheckIn" type="button"> Select Location </button></div>'],
  ];

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(), marker, i;
  for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i][0]
    });

    // Allow each marker to have an info window
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
          infoWindow.setContent(infoWindowContent[i][0]);
          infoWindow.open(map, marker);
      }
    })(marker, i));

    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
  }
}

$(document).on("click", '#bennuCheckIn', function() {
  $("#location-input").val('Bennu Coffee');
  $("#bennuCheckIn").remove()
});

$(document).on("click", '#epochCheckIn', function() {
  $("#location-input").val('Epoch Coffee');
  $("#epochCheckIn").remove()
});

$(document).on("click", '#mozartCheckIn', function() {
  $("#location-input").val("Mozarts Coffee Roasters");
  $("#mozartCheckIn").remove()
});

$(document).on("click", '#radioCheckIn', function() {
  $("#location-input").val('Radio');
  $("#radioCheckIn").remove()
});

$(document).on("click", '#wrightCheckIn', function() {
  $("#location-input").val('Wright Bros');
  $("#wrightCheckIn").remove()
});

$(document).on("click", '#thunderCheckIn', function() {
  $("#location-input").val('Thunderbird Coffee');
  $("#thunderCheckIn").remove()
});

$(document).on("click", '#dominicanCheckIn', function() {
  $("#location-input").val('Dominican Joe');
  $("#dominicanCheckIn").remove()
});

$(document).on("click", '#figureCheckIn', function() {
  $("#location-input").val('Figure 8');
  $("#figureCheckIn").remove()
});
