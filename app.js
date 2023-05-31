class PlaceWeather {
  constructor(name, days) {
    this.name = name;
    this.days = days;
  }
}

class Day {
  constructor(numDay, maxtempC, mintempC, dailyChanceOfRain) {
    this.numDay = numDay;
    this.maxtempC = maxtempC;
    this.mintempC = mintempC;
    this.dailyChanceOfRain = dailyChanceOfRain;
  }
}

async function getWeather(place) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b588725b22be4c8d8c492256232505&q=${place}&days=4&aqi=no&alerts=no`
  );
  const data = await response.json();

  const days = [];
  data.forecast.forecastday.forEach((day, index) => {
    const currDay = new Day(
      index,
      day.day.maxtemp_c,
      day.day.mintemp_c,
      day.day.daily_chance_of_rain
    );
    days.push(currDay);
  });
  const newPlace = new PlaceWeather(place, days);
  return newPlace;
}

getWeather('London');

// data.current.temp_c
// data.current.cloud
// data.forecast.forecastday[0].day.maxtemp_c
// data.forecast.forecastday[0].day.mintemp_c
// data.forecast.forecastday[0].day.daily_chance_of_rain
// data.forecast.forecastday[0].day.daily_ill_it_rain
