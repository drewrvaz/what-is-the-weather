var APIKey = "3ea4d2de1606fec8c25abcf7659af663";
cityList = [];

$(document).ready(function() {
  var pastCities = JSON.parse(localStorage.getItem(cityList));

  if (cityList !== null) {
    cityList = pastCities;
  }
})

$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  var city = $("#search-city").val();
  if (city === "") {
     return(city);
  }
  cityList.push(city);
  console.log("clicked!")

  getWeather();
  savedCities();
})

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
