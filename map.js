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
    ];
    // Info Window Content
  var infoWindowContent = [
    ['<div class="info_content">' + '<h3>Bennu Coffee</h3>' + '<p>Students gather at this chill, cozy 24/7 cafe pouring fair trade cofee drinks, plus light fare.</p>' + '<p><b>Address:</b> 2001 E Martin Luther King Jr Blvd, Austin, TX 78702<br>' + '<p><b>Hours:</b> Open 24 hours</p>' + '<p><b>Phone:</b> (512)478-4700<p>' + '<br><button class="btn btn-default" id="bennuCheckIn" type="button"> Select Location </button></div>'],

    ['<div class="info_content">' + '<h3>Epoch Coffee</h3>' + '<p>24/7 coffee shop vending espresso drinks, sweets & pizza from East Side Pies in open, casual space.</p>' + '<p><b>Address:</b> 221 W N Loop Blvd, Austin, TX 78751<br>' + '<p><b>Hours:</b> Open 24 hours</p>' + '<p><b>Phone:</b> (512)454-3762<p>' + '<br><button class="btn btn-default" id="epochCheckIn" type="button"> Select Location </button></div>'],

    ['<div class="info_content">' + '<h3>Radio</h3>' + '<p>Hip spot for coffee, beer & pastries in wood-paneled digs, plus tables & a taco truck out back.</p>' + '<p><b>Address:</b> 4204 Manchaca Rd, Austin, TX 78704<br>' + '<p><b>Hours:</b> 6:30AM-12AM</p>' + '<p><b>Phone:</b> (512)394-7844<p>' + '<br><button class="btn btn-default" id="radioCheckIn" type="button"> Select Location </button></div>'],

    ['<div class="info_content">' + '<h3>Mozart\'s Coffee Roasters</h3>' + '<p>Beans flame-roasted on-site, plus bakery goods, frequent live music & patio seating on Lake Austin.</p>' + '<p><b>Address:</b> 3825 Lake Austin Blvd, Austin, TX 78703<br>' + '<p><b>Hours:</b> 7AM-12AM</p>' + '<p><b>Phone:</b> (512)477-2900<p>' + '<br><button class="btn btn-default" id="mozartCheckIn" type="button"> Select Location </button></div>'],
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

  $(document).on("click", '#bennuCheckIn', function()
  {
    $("#location-input").val('Bennu Coffee');
    $("#bennuCheckIn").remove()
  });

  $(document).on("click", '#epochCheckIn', function()
  {
    $("#location-input").val('Epoch Coffee');
    $("#epochCheckIn").remove()
  });

  $(document).on("click", '#mozartCheckIn', function()
  {
    $("#location-input").val("Mozart's Coffee Roasters");
    $("#mozartCheckIn").remove()
  });

  $(document).on("click", '#radioCheckIn', function()
  {
    $("#location-input").val('Radio');
    $("#radioCheckIn").remove()
  });
