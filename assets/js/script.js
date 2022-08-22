const APIKey = "3ea4d2de1606fec8c25abcf7659af663";
var cities = [];
var currentCity;

var tableBody = document.getElementById("list-of-cities")
var searchHistory = JSON.parse(localStorage.getItem(cities))

$(document).ready(function() {
  if (cities !== null) {
    cities = searchHistory || [];
  }
});

function savedCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
}
 
$("#city-form").on("submit", function(event) {
  event.preventDefault();
  city = $("#city-form").val();
  cities = [];
  cities.push(city);
  console.log("clicked")
  
  getWeather();
  storedCities();
  showCity();
});

function presentCity() {
  var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
  var cityListEl = document.createElement("ul");
  cityListEl.classList.add("list-unstyled");
  cityListEl.classList.add("w-100");

  for (var i = 0; i < storedCities.length; i++) {
    var cityLiEl = document.createElement("li");
    cityLiEl.innerHTML = "<button type='button' class='list-group-item list-group-item-action' attr='"+cities[i]+"'>" + cities[i] + "</button>";
    cityListEl.appendChild(cityLiEl);
  }
  tableBody.appendChild(cityListEl);
};

function getWeather() {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + APIKey;
  fetch(queryURL)
  .then(function(response) {
    return response.json();
  })

  .then(function(data) {
    currentDate = moment.unix(data.dt).format("1");
    var weatherIcon = data.weather[0].icon;
    weatherIconEl = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
    var temperatureVal = data.main.temp;
    humidityVal = data.main.humidity;
    windSpeed = data.wind.speed;
    var latitude = data.coord.lat
    var longitude = data.coord.long

    var uvAPIurl = "https://api.openweather.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + latitude + "&long" + longitude;
    fetch(uvAPIurl)

    .then(function(response) {
      return response.json();
    })

    .then(function(data) {
      uvIndex = data.value;

      if(uvIndex <= 2) {
          $("#todaysWeather").addClass("low")
      } else if(2 < uvIndex <= 5) {
        $("#todaysWeather").addClass("moderate")
      } else if(5 < uvIndex <= 7) {
        $("#todaysWeather").addClass("high")
      } else if(uvIndex >= 8) {
        $("#todaysWeather").addClass("extreme")
      }
    })

    currentWeather();
    showFutureCast();
  })
}

function currentWeather() {
  console.log(city);

  var currentWeather = $("#todaysWeather");
  var header = $("<div class='container'>");
  var weatherDiv = $("<div class='container'>");

  var cityEl = $("<h2");
  cityEl.text(city);
  currentWeather.empty();

  currentDateEl = $("<h3>").text(currentDate.toString());
  console.log(currentDateEl);

  var weatherIcon = $("<img>").attr(src, weatherIconEl);
  var headerText = $("<h3>").text(city + " " + currentDate.toString());
  headerText.append(weatherIcon);
  header.append(headerText);
  $("#todaysWeather").append(header);

  var temperatureEl = $("<p>").text("Temp: " + temperatureVal + " F ");
  weatherDiv.append(temperatureEl);
  $("#todaysWeather").append(weatherDiv);
  console.log(temperatureEl);

  var humidityEl = $("<p>").text("Humidity: " + humidityVal + " % ");
  weatherDiv.append(humidityEl);
  $("#todaysWeather").append(weatherDiv);
  console.log(humidityEl);

  var windSpeedEl = $("<p>").text("Wind: " + windSpeed + " MPH ");
  weatherDiv.append(windSpeedEl);
  $("#todaysWeather").append(weatherDiv);
  console.log(windSpeedEl);

  var uvEl = $("<div>").text(uvIndex);
  weatherDiv.append(uvEl);
  $("#todaysWeather").append(weatherDiv);
  console.log(uvEl);
}

// var city = $("#city-input");
// var searchBtn = $("#searchBtn");
// var pastCities = $("#past-cities");

// var currentCity;

// // Function to display the current weather for the user's chosen location, as well as the 5 day forecast for the same location

//   .then(function(data){
//     // current conditions in the city
//     var todaysWeather = $("#todaysWeather");

//     // creating a city element and displaying it in html
//     
   

//     // get the date and display it 
//     var currentCityDate = data.current.dt;
//     currentCityDate = moment().format("MM/DD/YYYY");
//     var currentCityDateEl = $("<span>");
//     currentCityDateEl.text($(currentCityDate));
//     cityEl.append(currentCityDateEl);
//   })
// }

// $("#city-form").on("submit", function(event) {
//   event.preventDefault();
//   currentCity = $("#city-form").val();
//   console.log("clicked")

//   getWeather()
// })


// function weatherAPI() {
//   var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&APPID=" + APIKey + "&units=imperial";
//   fetch(queryURL)
// }

// function getWeather() {
//   weatherAPI()
//   .then(function (response) {
//     return response.json();
// })
//   .then(function(data) {
//     console.log(currentCity);

//     var cityName = $("#cityName")
//     cityName.value = (currentCity)

//   })
// }
// const APIKey = "3ea4d2de1606fec8c25abcf7659af663";
// // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
// const city = $("#city-input").val();
// // fetch(queryURL)

// var searchBtn = $("#searchBtn");
// var cityInput = $("#city-input");
// var listOfCities = $("#list-of-cities");
// var cityForm = $("#city-form");

// // $(document).ready(function() {
// //   var pastCities = JSON.parse(localStorage.getItem(cityList));

// //   if (cityList !== null) {
// //     cityList = pastCities;
// //   }
// // })

// // let cityStorage = localStorage.getItem("search-city")
// //   ? JSON.parse(localStorage.getItem("search-city"))
// //   : [];

// // var listBuilder = (text) => {
// //   var pastCity = document.createElement("li");
// //   pastCity.innerHTML = text;
// //   notes.appendChild(pastCity);
// // }

// // var getCities = JSON.parse(localStorage.getItem("search-city"));
// // getCities.forEach(function()) {
// //   listBuilder(pastCity)
// // }

// // console.log(cityList)

// function getWeather() {
//   currentCity = $("#city-input")
//   var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
//   console.log(queryURL)
//   fetch(queryURL)
//   .then(function (response) {
//     return response.json();
// })
//   .then(function(data) {
//     console.log(data);
//   })
// }
