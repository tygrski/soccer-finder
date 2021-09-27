
/*var nameSubmit = document.querySelector("#search-btn");

nameSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  var nameInputEl = document.querySelector("#input-value").value.trim();
  var openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${nameInputEl}&units=imperial&appid=3f698036d7cb81fb192ca1a1ad2af845`;
  //console.log(nameInputEl);

  fetch(openWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
  
    }); 
});*/

// calendar section start
var submitBtn = document.querySelector("#play-button");
var submit = document.querySelector("#submit");
var date = document.querySelector("#date");
var teamName = document.querySelector("#team-name");
var teamCaptain = document.querySelector("#captain");
var phoneNumber = document.querySelector("#phone");
var email = document.querySelector("#email");
var playerAmount = document.querySelector("#player-amount");
var newEvent = document.querySelector("#new-event");
var locationOptions = document.querySelector("#locations");
var tableHeader = document.querySelector("#table-header");
var displaymessage = document.querySelector("#msg");
var forecastContainerEl = document.querySelector("#fiveday-container");


var forecastTitle = document.querySelector("#forecast");


var city = "Austin";
var button = document.querySelector("#btn");
var forecastContainerEl = document.querySelector("#fiveday-container");

button.addEventListener("click", function (e) {
  e.preventDefault();
  //var nextEl = document.querySelector("#next-btn");
  var openWeatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=3f698036d7cb81fb192ca1a1ad2af845`;

  fetch(openWeatherForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      forecastContainerEl.textContent = ""


      forecastTitle.textContent = "Please check upcoming weather conditions prior to picking a date to play";



      var forecast = response.list;
      for (var i = 5; i < forecast.length; i = i + 8) {
        var dailyForecast = forecast[i];
        console.log(dailyForecast);


        var forecastEl = document.createElement("div");
        forecastEl.classList = "card bg-info color text-light m-2";

        //console.log(dailyForecast)

        //create date element
        var forecastDate = document.createElement("h5")
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);


        //create an image element
        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);

        //append to forecast card
        forecastEl.appendChild(weatherIcon);

        //create temperature span
        var forecastTempEl = document.createElement("span");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

        var forecastHumEl = document.createElement("span");
        forecastHumEl.classList = "card-body text-center";
        forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

        //append to forecast card
        forecastEl.appendChild(forecastHumEl);

        // console.log(forecastEl);
        //append to five day container
        forecastContainerEl.appendChild(forecastEl);
      }

    });

  var openWeatherCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?q=Austin&units=imperial&appid=3f698036d7cb81fb192ca1a1ad2af845`;

  fetch(openWeatherCurrentUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      var currentName = document.getElementById("current-name");
      var currentIcon = document.getElementById("current-icon");
      var currentDescription = document.getElementById("current-description");

      var nameTitle = document.createElement("span");
      var uppercase = response.name.toUpperCase() + " " + "weather".toUpperCase();
      nameTitle.className = "city-title";
      nameTitle.textContent = uppercase;


      var iconTitle = document.createElement("img");
      iconTitle.setAttribute("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);

      var number = document.createElement("span");
      number.textContent = Math.round(response.main.temp) + " °F";
      number.className = "temp"

      var text = document.createElement("p");
      text.textContent = response.weather[0].description;
      text.className = "text-description";


      currentName.appendChild(nameTitle);
      currentIcon.appendChild(iconTitle);
      currentDescription.appendChild(number);
      currentDescription.appendChild(text);

    });
     $('#btn').hide();
});

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

// events map
var events = new Map();



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

  marker.addListener("click", (function (marker, i) {
    return function () {
     // displayEvent(locations[i][0]);
      infowindow.setContent(`<h1>${locations[i][0]}</h1 class="table">`)
      infowindow.open(map, marker)


    }
  })(marker, i));
}

// addMarker({
//   coords:{lat: 30.1980, lng: -97.8836},
//   // content:'<h1>Slaughter Creek Fields 4</h1>'
// });

// 
  
function displayEvent(location) {
  var styleTable = document.querySelector('#new-event');
  var locationTable = document.querySelector("#location-table");
  locationTable.removeAttribute("class");
  styleTable.classList.remove('hide');
  var tBody = document.querySelector("#t-body");
  var locationEvents = JSON.parse(localStorage.getItem("events")) || [];
  console.log("location events", locationEvents);
  tBody.innerHTML = "";
  console.log("location value", location);
  for (var i = 0; i < locationEvents.length; i++) {
    if (locationEvents[i].fieldName == locationOptions.value || locationEvents[i].fieldName == location) {
      var row = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var td4 = document.createElement('td');
      var td5 = document.createElement('td');
      var td6 = document.createElement('td');

      var td1Text = document.createTextNode(locationEvents[i].teamName)
      var td2Text = document.createTextNode(locationEvents[i].teamCaptain)
      var td3Text = document.createTextNode(locationEvents[i].phoneNumber)
      var td4Text = document.createTextNode(locationEvents[i].email)
      var td5Text = document.createTextNode(locationEvents[i].date)
      var td6Text = document.createTextNode(locationEvents[i].players)


      td1.appendChild(td1Text);
      td2.appendChild(td2Text);
      td3.appendChild(td3Text);
      td4.appendChild(td4Text);
      td5.appendChild(td5Text);
      td6.appendChild(td6Text);


      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      row.appendChild(td4);
      row.appendChild(td5);
      row.appendChild(td6);
      tBody.appendChild(row);

    }
    else {
      console.log("false comparison")
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

console.log(submitBtn);
//var locationOne = document.querySelector("#location-one").focus();
submitBtn.addEventListener("click", function () {
  event.preventDefault();
  var submit = document.querySelector("#submit");

  $('#startdate').val()
  //var locationTable = document.querySelector("#location-table");
  //locationTable.removeAttribute("class");

  var dateValue = date.value;
  var teamNameValue = teamName.value;
  var teamCaptainValue = teamCaptain.value;
  var phoneNumberValue = phoneNumber.value;
  var emailValue = email.value;
  var playerAmountValue = playerAmount.value;
  var locationOptionsValue = locationOptions.value;
  var Button = document.createElement("button");
  var newEvent = {
    fieldName: locationOptionsValue,
    teamName: teamNameValue,
    teamCaptain: teamCaptainValue,
    phoneNumber: phoneNumberValue,
    email: emailValue,
    date: dateValue,
    players: playerAmountValue,

  };
  
if(dateValue ==="" || teamNameValue ==="" || teamCaptainValue ==="" || phoneNumberValue === "" || emailValue === "" || playerAmountValue ==="" || locationOptionsValue === ""){
    console.log("its empty");
    displaymessage.removeAttribute("class");
  } else {
    displaymessage.setAttribute("class", "hide");
    var localStorageEvents = JSON.parse(localStorage.getItem("events")) || [];
  localStorageEvents.push(newEvent);
  localStorage.setItem("events", JSON.stringify(localStorageEvents))
  //getSavedEvents();
  // changing to event data id to the corresponding data
  if (locationOptionsValue === "Onion Creek Soccer Complex") {
    tableHeader.innerHTML = locations[1][0];
    submit.setAttribute("data-location-name", locations[1][0]);
    submitBtn.appendChild(submit);
    addEventToMap(locations[1][0], teamNameValue, teamCaptainValue, phoneNumberValue, emailValue, dateValue, playerAmountValue)
  } else if (locationOptionsValue === "Tillery Fields") {
    tableHeader.innerHTML = locations[2][0];
    submit.setAttribute("data-location-name", locations[2][0]);
    submitBtn.appendChild(submit);
    addEventToMap(locations[2][0], teamNameValue, teamCaptainValue, phoneNumberValue, emailValue, dateValue, playerAmountValue)
  } else if (locationOptionsValue === "Sanchez Soccer Field") {
    tableHeader.innerHTML = locations[3][0];
    submit.setAttribute("data-location-name", locations[3][0]);
    submitBtn.appendChild(submit);
    addEventToMap(locations[3][0], teamNameValue, teamCaptainValue, phoneNumberValue, emailValue, dateValue, playerAmountValue)
  } else if (locationOptionsValue === "Quarry Field") {
    tableHeader.innerHTML = locations[4][0];
    submit.setAttribute("data-location-name", locations[4][0]);
    submitBtn.appendChild(submit);
    addEventToMap(locations[4][0], teamNameValue, teamCaptainValue, phoneNumberValue, emailValue, dateValue, playerAmountValue)
  } else {
    tableHeader.innerHTML = locations[0][0];
    submit.setAttribute("data-location-name", locations[0][0]);
    submitBtn.appendChild(submit);
    addEventToMap(locations[0][0], teamNameValue, teamCaptainValue, phoneNumberValue, emailValue, dateValue, playerAmountValue)
  }
  displayEvent();
  }
})

// create cell add to row
function createCell(cellValue, row) {
  console.log("cell value", cellValue)

  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  var td6 = document.createElement('td');



  td1.innerHTML = cellValue.teamName;
  td2.innerHTML = cellValue.teamCaptain;
  td3.innerHTML = cellValue.phoneNumber;
  td4.innerHTML = cellValue.email;
  td5.innerHTML = cellValue.date;
  td6.innerHTML = cellValue.players;


  // cell.innerHTML = cellValue;
  // row.appendChild(cell);

  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  row.appendChild(td5);
  row.appendChild(td6);
}
function getSavedEvents() {
  var savedEvents = JSON.parse(localStorage.getItem("events")) || [];
  savedEvents.map(data => {
    addEventToMap(data.fieldName, data.teamName, data.teamCaptain, data.phoneNumber, data.email, data.date, data.players)
  })
}
//getSavedEvents();
// creates new events, into our event storage
function addEventToMap(fieldName, teamName, teamCaptain, phoneNumber, email, date, players) {
  var savedEvents = JSON.parse(localStorage.getItem("events")) || [];
  const locationDetails = { teamName: teamName, teamCaptain: teamCaptain, phoneNumber: phoneNumber, email: email, date: date, players: players };
  savedEvents.push(locationDetails);

  // savedEvents.map(data =>{
  //   console.log(data);
  //   console.log("what is event",events);

  // })
  if (events.has(fieldName)) {
    events.get(fieldName).push(locationDetails);
  }
  else {
    events.set(fieldName, [locationDetails]);
  }
}
// calendar section end


function createButton() {
  let test = document.querySelector("#play-button");
  var Button = document.createElement("button");
  Button.setAttribute("Name", "submit");
  Button.setAttribute("id", "submit");
  Button.setAttribute("class", "btn btn-primary");
  Button.setAttribute("type", "submit");
  // Button.setAttribute("onclick", "displayEvent(this)");
  Button.innerHTML = "Play!⚽️";
  test.appendChild(Button);
  Button.appendChild(nameEl);
}
createButton();

