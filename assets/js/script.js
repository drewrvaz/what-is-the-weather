const APIKey = "3ea4d2de1606fec8c25abcf7659af663";

var city = $("#city-input");
var searchBtn = $("#searchBtn");
var pastCities = $("#past-cities");

var currentCity;

// Function to display the current weather for the user's chosen location, as well as the 5 day forecast for the same location
function getWeather(data) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&APPID=" + APIKey + "&units=imperial";
  fetch(queryURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data){
    var todaysWeather = $("#todaysWeather");

    var cityEl = $("<h2")
    cityEl.text(currentCity);
    todaysWeather.append(cityEl)
  })
}

$("#city-form").on("submit", function(event) {
  event.preventDefault();
  currentCity = $("#city-form").val();
})
// var cities = [];
// var currentCity;

// var tableBody = document.getElementById("list-of-cities")
// var searchHistory = JSON.parse(localStorage.getItem(cities))

// $(document).ready(function() {
//   if (cities !== null) {
//     cities = searchHistory || [];
//   }
// });

// function savedCities() {
//   localStorage.setItem("cities", JSON.stringify(cities))
//   console.log(localStorage)
// }

// $("#city-form").on("submit", function(event) {
//   event.preventDefault();
//   currentCity = $("#city-form").val();
//   cities = [];
//   cities.push(currentCity);
//   console.log("clicked")
  
//   getWeather();
//   storedCities();
//   showCity();
// });

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
