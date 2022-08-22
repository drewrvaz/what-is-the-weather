const APIKey = "3ea4d2de1606fec8c25abcf7659af663";
var cities = [];
var currentCity;

var tableBody = document.getElementById("past-cities")
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
 
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  city = $("#city-input").val();
  cities = [];
  cities.push(city);
  console.log("clicked")
  
  getWeather();
  savedCities();
  presentCity();
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
    currentDate = moment.unix(data.dt).format("MM/DD/YYYY");
    var weatherIcon = data.weather[0].icon;
    weatherIconEl = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
    temperatureVal = data.main.temp;
    humidityVal = data.main.humidity;
    windSpeed = data.wind.speed;
    latitude = data.coord.lat
    longitude = data.coord.lon

    var uvAPIurl = "http://api.openweather.org/data/2.5/uvi?&lat=" + latitude + "&lon" + longitude + "&APPID=" + APIKey;
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

  var uvEl = $("<div>").text(uvIndex);
  weatherDiv.append(uvEl);
  $("#todaysWeather").append(weatherDiv);
  console.log(uvEl);
}

function showFutureCast() {
  city = $("#city-input").val();

  var futureCastAPI = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&AAPID=" + APIKey;
  fetch(futureCastAPI)
  .then(function(response) {
    return response.json();
  })

  then(function(data) {
    city = $("#city-input").val();
    var futureCast = data.list;

    for (let i = 0; i < 5; i++) {
      futureDate = moment.add(i, "days").format("MM/DD/YYYY");
      futureWeatherIcon = data.list[i].weather[0].icon;
      futureWeatherIconEL = "http://openweathermap.org/img/w/" + futureWeatherIcon + ".png";
      futureHumidity = futureCast[i].main.humidity;
      futureTemp = futureCast[i].main.temp;
      futureWindSpeed = futureCast[i].wind.speed
    }

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
  })
  console.log(futureCastAPI)
}