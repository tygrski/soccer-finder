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

var forecastContainerEl = document.querySelector("#fiveday-container");

var city = "Austin";
var button = document.querySelector("#btn");
var forecastContainerEl = document.querySelector("#fiveday-container");

button.addEventListener("click", function (e) {
  e.preventDefault();
  //var nextEl = document.querySelector("#next-btn");
  var openWeatherForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=3f698036d7cb81fb192ca1a1ad2af845`;

  fetch(openWeatherForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      forecastContainerEl.textContent = ""
    

      var forecast = response.list;
      for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
       console.log(dailyForecast);
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-info color text-light m-2";

       //console.log(dailyForecast)

       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
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
      iconTitle.setAttribute("src", `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`); 

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
});
