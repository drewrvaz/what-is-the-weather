var APIKey = "3ea4d2de1606fec8c25abcf7659af663";
var searchBtn = $("#searchBtn");
var cityInput = $("#city-input");
var listOfCities = $("#list-of-cities");
var cityForm = $("#city-form")

// $(document).ready(function() {
//   var pastCities = JSON.parse(localStorage.getItem(cityList));

//   if (cityList !== null) {
//     cityList = pastCities;
//   }
// })

let cityStorage = localStorage.getItem("search-city")
  ? JSON.parse(localStorage.getItem("search-city"))
  : [];

$("#searchBtn").on("submit", function(event) {
  event.preventDefault();
  cityStorage.push(cityInput.value);
  localStorage.setItem("search-city", JSON.stringify(cityStorage));
  listBuilder(cityInput.value);
  cityInput.value = "";
});

var listBuilder = (text) => {
  var pastCity = document.createElement("li");
  pastCity.innerHTML = text;
  notes.appendChild(pastCity);
}

var getCities = JSON.parse(localStorage.getItem("search-city"));
getCities.forEach(pastCity) {
  listBuilder(pastCity)
}

// $("#searchBtn").on("submit", function(event) {
//   event.preventDefault();
//   var city = $("#search-city").val();
//   if (city === "") {
//      return(city);
//   }
//   cityList.push(city);
//   console.log("clicked!")

//   getWeather();
//   savedCities();
// })

// console.log(cityList)

function getWeather() {
  currentCity = $("#search-city")
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
  fetch(queryURL)
  .then(function (response) {
    return response.json();
})
  .then(function(response) {
    console.log(currentCity)
  })
}
