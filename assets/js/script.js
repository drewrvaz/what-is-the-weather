var APIKey = "3ea4d2de1606fec8c25abcf7659af663";
var cities = [];
var city = "Detroit";

var tableBody = document.getElementById("past-cities")
var searchHistory = JSON.parse(localStorage.getItem(cities))

//Function for the start of the page. Render's Detroit's current weather
$(document).ready(function() {
  if (cities !== null) {
    cities = searchHistory || [];
  }
  getWeather(city);
});

// Function to save cities that the user searches into local storage
function savedCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
}

// Function to clear city data when the user enters in a new city
function clearCity() {
  $(".card-deck").empty();
  $("#todaysWeather").empty();
}

// Event listener for the serach button
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  city = $("#city-input").val();
  cities = [];
  cities.push(city);
  console.log("clicked")
  
  clearCity();
  getWeather();
  savedCities();
  presentCity();
});

// Event listener for the past seaches that the user has made
$("main").delegate(".list-group-item", "click", function() {
  clearCity();
  city = $(this).text();
  getWeather()
  console.log("clicked")
})

// Function that presents the cities that the user previously searched for
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

// Function that gets the weather from the searched city using Open Weather Map's API
function getWeather() {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + APIKey;
  fetch(queryURL)
  .then(function(response) {
    return response.json();
  })

  .then(function(data) {
    currentDate = moment.unix(data.dt).format("MM/DD/YYYY");
    var weatherIcon = data.weather[0].icon;
    weatherIconEl = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
    temperatureVal = data.main.temp;
    humidityVal = data.main.humidity;
    windSpeed = data.wind.speed;
    latitude = data.coord.lat
    longitude = data.coord.lon

    // Searches the Open Weather Map API for the current UV Index for the user's input
    var uvAPIurl = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
    fetch(uvAPIurl)

    .then(function(response) {
      return response.json();
    })

    .then(function(data) {
      uvIndex = data.value;

      if(uvIndex <= 4) {
        $("#UVIndex").addClass("low")
      } else if(4 < uvIndex <= 8) {
        $("#UVIndex").addClass("moderate")
      } else if(uvIndex > 8) {
        $("#UVIndex").addClass("extreme")
      }

      currentWeather();
      showFutureCast();
    })
  })
}  

// Function to display the current weather for the user's input
function currentWeather() {
  console.log(city);

  var currentWeather = $("#todaysWeather");
  var header = $("<div class='container'>");
  var weatherDiv = $("<div class='container'>");
  var uvIndexDiv = $("#UVIndex");

  var cityEl = $("<h2>");
  cityEl.text(city);
  currentWeather.empty();

  currentDateEl = $("<h3>").text(currentDate.toString());
  console.log(currentDateEl);

  var weatherIcon = $("<img>").attr("src", weatherIconEl);
  var headerText = $("<h3>").text(city + " " + currentDate.toString());
  headerText.append(weatherIcon);
  header.append(headerText);
  $("#todaysWeather").append(header);

  var temperatureEl = $("<p>").text("Temp: " + temperatureVal + " ºF ");
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

  var uvEl = $("<p>").text("UV Index: " + uvIndex);
  uvIndexDiv.append(uvEl);
  weatherDiv.append(uvIndexDiv);
  $("#todaysWeather").append(weatherDiv);
  console.log(uvEl);
}

// Function to show the future forecast for the user's input
function showFutureCast() {

  var futureCastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
  fetch(futureCastAPI)
  .then(function(response) {
    return response.json();
  })

  .then(function(data) {
    city = $("#city-input").val();
    var futureCast = data.list;

    for (let i = 0; i < 5; i++) {
      futureDate = moment().add(i, "days").format("MM/DD/YYYY");
      futureWeatherIcon = data.list[i].weather[0].icon;
      futureWeatherIconEL = "http://openweathermap.org/img/w/" + futureWeatherIcon + ".png";
      futureHumidity = futureCast[i].main.humidity;
      futureTemp = futureCast[i].main.temp;
      futureWindSpeed = futureCast[i].wind.speed

      var card = $("<div class='card'>").addClass("futureCastCards");
      var cardDiv = $("<div>").attr("class", "card-block")
      var cardDate = $("<h6>").text(futureDate).addClass("pt-2");
      var dateDiv = $("<div>").attr("class", "card-block")
      var textDiv = $("<div>").attr("class", "card-text")
      var imgEl = $("<img>").attr("src", futureWeatherIconEL);
      var futureTempEl = $("<p>").text("Temp: " + futureTemp + " ºF")
      var futureWindEl = $("<p>").text("Wind: " + futureWindSpeed + " MPH")
      var futureHumidityEl = $("<p>").text("Humidity " + futureHumidity + "%");

      dateDiv.append(cardDate);
      cardDiv.append(dateDiv);
      textDiv.append(imgEl);
      textDiv.append(futureTempEl);
      textDiv.append(futureWindEl);
      textDiv.append(futureHumidityEl);
      card.append(cardDiv);
      cardDiv.append(textDiv);
      $(".card-deck").append(card);
    }
  })
}
