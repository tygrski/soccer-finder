   // google map fields markers
var locations = [
  ['Slaughter Creek Fields 4', 30.1980, -97.8836],
  ['Onion Creek Soccer Complex', 30.1771, -97.7403],
  ['Tillery Fields', 30.2703, -97.6999 ],
  ['Sanchez Soccer Field',  30.2571, -97.7354],
  ['Quarry Field', 30.3992, -97.7358]
  ];

  // map display and markers
// let map;
// function initMap() {
  
//  var options = {
//    zoom:10,
//    center: {lat: 30.266666, lng:-97.733330}
//  }
//  var map = new
//  google.maps.Map(document.getElementById('map'), options);
 
// //  add marker
// //  var marker = new google.maps.Marker({
// //    position:{lat: 30.1980, lng: -97.8836},
// //    map:map
// //    });

// //    var infoWindow = new google.maps.InfoWindow({
// //      content:'<h1>Slaughter Creek Fields 4</h1><br><p>6301 W Slaughter Ln, Austin, TX 78739</p>'
// //    });
// //    marker.addListener('click', function(){
// //      infoWindow.open(map,marker);
// //    });
// // add marker function 
// addMarker({
//   coords:{lat: 30.1980, lng: -97.8836},
//   // content:'<h1>Slaughter Creek Fields 4</h1>' 
// });
//   // );
// //  addMarker({coords:{lat: 30.1771, lng: -97.7403}});
// //  addMarker({coords:{lat: 30.2703, lng: -97.6999}});
// //  addMarker({coords:{lat: 30.2571, lng: -97.7354}});
// //  addMarker({coords:{lat: 30.3992, lng: -97.7358}});
  
// //  add marker
//   function addMarker(coords){
   
//   }
// };
// center: {lat: 30.266666, lng:-97.733330}
var map = new google.maps.Map(document.getElementById('map'),
{
zoom:10,
center:new google.maps.LatLng(30.266666,-97.733330)
}
)

for ( var i =0; i < locations.length; i++) {
  console.log(locations[i][1],locations[i][2]);
  var marker = new google.maps.Marker({
    position:new google.maps.LatLng(locations[i][1],locations[i][2]),
    map:map
});
}