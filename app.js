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
    this.tempC = tempC;
    this.maxtempC = maxtempC;
    this.mintempC = mintempC;
    this.dailyChanceOfRain = dailyChanceOfRain;
  }
}

function getDayOfWeek(formattedDate) {
  const date = new Date(formattedDate);
  const options = { weekday: 'short' };
  const dayOfWeek = date.toLocaleDateString('en-US', options);
  return dayOfWeek;
}

async function getWeather(place) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b588725b22be4c8d8c492256232505&q=${place}&days=4&aqi=no&alerts=no`
  );
  const data = await response.json();

  console.log(data);

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

// function returnIcon(condition) {
//   const icons = ['sun', 'cloud', 'sun-cloud', 'cloud-bolt', 'cloud-rain'];
//   if (condition === 'sunny') {
//     return 'sun'
//   } else if (condition === )
// }

function displayWeather(weatherObj) {
  const weatherContent = document.querySelector('.weather-content');
  weatherContent.innerHTML = '';

  const currentDay = weatherObj.days[0];
  const forecastDays = [
    weatherObj.days[1],
    weatherObj.days[2],
    weatherObj.days[3],
  ];

  const currentWeatherDiv = document.createElement('div');
  currentWeatherDiv.className = 'current-weather';

  const tempIconDiv = document.createElement('div');
  tempIconDiv.className = 'temp-icon';

  const tempParagraph = document.createElement('p');
  tempParagraph.className = 'temp';
  tempParagraph.textContent = currentDay.tempC + 'º';

  const icon = document.createElement('img');
  icon.classList.add('icon');
  icon.src = 'https://cdn.weatherapi.com/weather/64x64/day/176.png';

  tempIconDiv.appendChild(tempParagraph);
  tempIconDiv.appendChild(icon);

  const placeName = document.createElement('h2');
  placeName.textContent = weatherObj.name;

  const temperatureParagraph = document.createElement('p');
  temperatureParagraph.textContent = `${currentDay.maxtempC} - ${currentDay.mintempC}`;

  const circle = document.createElement('div');
  circle.classList.add('circle');

  currentWeatherDiv.appendChild(circle);
  currentWeatherDiv.appendChild(tempIconDiv);
  currentWeatherDiv.appendChild(placeName);
  currentWeatherDiv.appendChild(temperatureParagraph);

  const forecastWeatherDiv = document.createElement('div');
  forecastWeatherDiv.className = 'forecast-weather';

  for (let day of forecastDays) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';

    const dateParagraph = document.createElement('p');
    dateParagraph.className = 'date';
    dateParagraph.textContent = getDayOfWeek(day.date);

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-cloud';

    const minMaxParagraph = document.createElement('p');
    minMaxParagraph.className = 'min-max';

    const maxTempSpan = document.createElement('span');
    maxTempSpan.textContent = day.maxtempC + 'º';

    const minTempSpan = document.createElement('span');
    minTempSpan.textContent = day.mintempC + 'º';

    minMaxParagraph.appendChild(maxTempSpan);
    minMaxParagraph.appendChild(minTempSpan);

    dayDiv.appendChild(dateParagraph);
    dayDiv.appendChild(icon);
    dayDiv.appendChild(minMaxParagraph);

    forecastWeatherDiv.appendChild(dayDiv);
  }

  weatherContent.appendChild(currentWeatherDiv);
  weatherContent.appendChild(forecastWeatherDiv);
}

const button = document.querySelector('button');
button.addEventListener('click', function (e) {
  const searchQ = e.target.previousElementSibling.value;
  getWeather(searchQ).then((data) => {
    displayWeather(data);
  });
});

const input = document.querySelector('input');
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const searchQ = input.value;
    getWeather(searchQ).then((data) => {
      displayWeather(data);
    });
  }
});

getWeather('London').then((data) => {
  displayWeather(data);
});
