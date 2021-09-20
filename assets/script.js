// google map fields markers
// var locations = [
//   ['Slaughter Creek Fields 4', 30.1980, 97.8836],
//   ['Onion Creek Soccer Complex', 30.1771, 97.7403],
//   ['Tillery Fields', 30.2703, 97.6999 ],
//   ['Sanchez Soccer Field',  30.2571, 97.7354],
//   ['Quarry Field', 30.3992, 97.7358]
//   ];

  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.2672, lng: 97.7431 },
      zoom: 8
    });
    // var marker = new google.maps.Marker({
    //   position:{},
    //   map:map,
    // })
  };
  // initMap();
  