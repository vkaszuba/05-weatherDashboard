let userCity = "Berlin";
let userState = "California";

const APIKey = "166a433c57516f51dfab1f7edaed8413";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity},${userState}&units=imperial&appid=${APIKey}`;



$.ajax({
  url,
  method: "GET"
}).then(function(response){

  let uvUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${response.coord.lat}&lon=${response.coord.lon}`;

  $.ajax({
      url: uvUrl,
      method: "GET"
  }).then(function(uvResponse){

  console.log(response);
  console.log(uvResponse);

  let date = new Date(response.dt * 1000).toDateString();
  let icon = `http://openweathermap.org/img/wn/${response.weather["0"].icon}@2x.png`;

  $(".city").text(`City Name: ${response.name + ", " + response.sys.country}`);
  $(".date").text(`Date: ${date}`);
  $(".icon").attr("src", icon);
  $(".temp").text(`Temperature: ${response.main.temp}`);
  $(".wind").text(`Wind Speed: ${response.wind.speed}`);
  $(".uvIndex").text(`UV Index: ${uvResponse.value}`);
  $(".humidity").text(`Humidity: ${response.main.humidity}`);



})

console.log(response);
console.log(uvResponse);
});

