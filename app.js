class PlaceWeather {
  constructor(name, days) {
    this.name = name;
    this.days = days;
  }
}

class Day {
  constructor(numDay, date, tempC, maxtempC, mintempC, dailyChanceOfRain) {
    this.numDay = numDay;
    this.date = date;
    (this.tempC = tempC), (this.maxtempC = maxtempC);
    this.mintempC = mintempC;
    this.dailyChanceOfRain = dailyChanceOfRain;
  }

  computeRain() {
    if (this.dailyChanceOfRain === 0) {
      return 'None';
    } else {
      return 'Some rain';
    }
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
      day.date,
      data.current.temp_c,
      day.day.maxtemp_c,
      day.day.mintemp_c,
      day.day.daily_chance_of_rain
    );
    days.push(currDay);
  });
  const newPlace = new PlaceWeather(place, days);
  return newPlace;
}
