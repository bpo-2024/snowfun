  // When the window has finished loading create our google map below
  var map;
  var marker;
  console.log(1234)

  google.maps.event.addDomListener(window, "load", init);

  function updateMapPosition(latitude, longitude) {
    var newPosition = new google.maps.LatLng(latitude, longitude);
    var newCenter= new google.maps.LatLng(latitude, longitude + 0.3);
    map.setCenter(newCenter);
    // marker.setPosition(newPosition);
  }

  function init() {
    var mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(43.17411408806869, 142.80809972631752 + 0.3),
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            { saturation: -100 },
            { lightness: 45 },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [
            { color: "#ebf1f6" },
            { visibility: "on" },
          ],
        },
      ],
    };

    var mapElement = document.getElementById("map");
    map = new google.maps.Map(mapElement, mapOptions);

    marker = new google.maps.Marker({
      // position: new google.maps.LatLng(43.17411408806869, 142.80809972631752),
      // animation: google.maps.Animation.BOUNCE,
      // icon: 'https://cdn2.iconfinder.com/data/icons/travel-solid-world-is-beautiful/512/Plane-24.png',
      // title: 'sahoro',
      // label: 'have fun',
      map: map,
    });
    
  }
