var openWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=30.33&lon=-97.78&appid=3f698036d7cb81fb192ca1a1ad2af845";
fetch(openWeatherUrl).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
        })
    }else {
        alert("An error occurred");
    }
})



