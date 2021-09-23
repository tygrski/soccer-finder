// google map fields markers
var locations = [
  ["Slaughter Creek Fields 4", 30.198, -97.8836],
  ["Onion Creek Soccer Complex", 30.1771, -97.7403],
  ["Tillery Fields", 30.2703, -97.6999],
  ["Sanchez Soccer Field", 30.2571, -97.7354],
  ["Quarry Field", 30.3992, -97.7358],
];

// events map
var events = new Map();
// events.set("Slaughter Creek Fields 4",[{teamName: "Paul",teamCaptain: "George", phoneNumber: "512", email: "email", date: "09/04/2021"}]);
// events.set("Onion Creek Soccer Complex",[{teamName: "Paul",teamCaptain: "George", phoneNumber: "512", email: "email", date: "09/04/2021"}]);
addEventToMap("Slaughter Creek Fields 4", "Paul", "George", "512", "@email", "10/10/2021");
addEventToMap("Slaughter Creek Fields 4", "George", "Paul", "512", "@email", "10/10/2021");
// map display and markers

var map = new google.maps.Map(document.getElementById("map"), {
  zoom: 10,
  center: new google.maps.LatLng(30.266666, -97.73333),
});
const infowindow = new google.maps.InfoWindow();

for (var i = 0; i < locations.length; i++) {
  console.log(locations[i][1], locations[i][2]);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    map: map,
  });

  marker.addListener("click", (function (marker, i) {

    return function () {
      infowindow.setContent(`<h1>${locations[i][0]}</h1><button onclick="displayEvent(this)" data-location-name="${locations[i][0]}">Check Events</button>`)
      infowindow.open(map, marker)


    }
  })(marker, i));
}

// addMarker({
//   coords:{lat: 30.1980, lng: -97.8836},
//   // content:'<h1>Slaughter Creek Fields 4</h1>'
// });

// 
function displayEvent(evt) {
  var tBody = document.querySelector("#t-body");
  const locationName = evt.dataset.locationName;
  
  if (events.has(locationName)) {
    const locationEvents = events.get(locationName);
    

    // empty out the tbodies
    tBody.innerHTML = "";
    // creating new rows 
    for (let index = 0; index < locationEvents.length; index++) {
      const locationOfEvent = locationEvents[index];


      var row = document.createElement("tr");

      // itterate through the properties in the object
      for (const property in locationOfEvent) {
        if (Object.hasOwnProperty.call(locationOfEvent, property)) {
          const propertyValue = locationOfEvent[property];
          createCell(propertyValue, row);
        }
      }

      tBody.appendChild(row);
    }
  }

}


// displaying the form for the calendar
$(document).ready(function () {
  var date_input = $('input[name="date"]'); //our date input has the name "date"
  var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
  date_input.datepicker({
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  })
})
// calendar section start
var submitBtn = document.querySelector("#submit");
var date = document.querySelector("#date");
var newEvent = document.querySelector("#new-event");
console.log(submitBtn);
//var locationOne = document.querySelector("#location-one").focus();
submitBtn.addEventListener("click", function () {
  event.preventDefault();
  $('#startdate').val()
  console.log(submitBtn);
  console.log(date);
  console.log(date.value);
  var dateValue = date.value;
  console.log(dateValue);
  addEventToMap("Slaughter Creek Fields 4","Chris","john","512","email",dateValue)
  // create the event list/values
  // var eventHeader = document.createElement("h3");
  // eventHeader.appendChild(dateValue);
  // console.log(eventHeader);
  // newEvent.appendChild(eventHeader);

})

// create cell add to row
function createCell(cellValue, row) {
  var cell = document.createElement("td");
  cell.innerHTML = cellValue;
  row.appendChild(cell);
}

// creates new events, into our event storage
function addEventToMap(fieldName, teamName, teamCaptain, phoneNumber, email, date) {
  const locationDetails = { teamName: teamName, teamCaptain: teamCaptain, phoneNumber: phoneNumber, email: email, date: date};
  if (events.has(fieldName)) {
    events.get(fieldName).push(locationDetails);
  }
  else {
    events.set(fieldName, [locationDetails]);
  }
}
// calendar section end

