// google map fields markers
var locations = [
  ["Slaughter Creek Fields 4", 30.198, -97.8836],
  ["Onion Creek Soccer Complex", 30.1771, -97.7403],
  ["Tillery Fields", 30.2703, -97.6999],
  ["Sanchez Soccer Field", 30.2571, -97.7354],
  ["Quarry Field", 30.3992, -97.7358],
];
var fieldList = document.getElementById("selected-fields")
const infowindow = new google.maps.InfoWindow();

// map display and center to selected city(Austin)
var map = new google.maps.Map(document.getElementById("map"), {
  zoom: 10,
  center: new google.maps.LatLng(30.266666, -97.73333),
});

  // lop through locations array
for (var i = 0; i < locations.length; i++) {
  // console.log(locations[i][1], locations[i][2]);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    map: map,
  });
  
  // function to display locations on marker and add to a list
  marker.addListener("click",(function(marker, i)  {
  
    return  function() {
    
    listItem = document.createElement('li');

    // Add the item text
    listItem.innerHTML = locations[i][0];
  
    // Add listItem to the listElement
    fieldList.appendChild(listItem)
    
    // display location name on marker
    infowindow.setContent(locations[i][0])
    infowindow.open(map, marker)
  }
})
(marker,i));
}
