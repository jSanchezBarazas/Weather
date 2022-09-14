
citiesList = []
const apikey = "43a2945a6d8d45fe8147d44181ef632b";
var localization = {
  "en":
    [
      { id: "headtittle", text: "Weather" },
    ],
  "es":
    [
      { id: "headtittle", text: "Tiempo" },
    ]
}

function getCities(api_url) {

  fetch(api_url).then((response) => response.json()).then((data) => {
    this.showResults(data.list)
  }
  )
}

function getSeason(month, day) {
  if (month === '04' || month === '05') {
    return ('spring');
  } else if ((day >= 20 && month === '03') || (day < 21 && month === '06')) {
    return ('spring');
  } else if (month === '07' || month === '08') {
    return ("summer");
  } else if ((day >= 21 && month === '06') || (day < 22 && month === '09')) {
    return ("summer");
  } else if (month === '10' || month === '11') {
    return ("autumn");
  } else if ((day >= 22 && month === '09') || (day < 21 && month === '12')) {
    return ("autumn");
  } else if (month === 'Oct' || month === 'Nov') {
    return ("winter");
  } else if ((day >= 21 && month === '12') || (day < 20 && month === '03')) {
    return ("winter");
  }

}
function formatHoursTo12(date) {
  return date.getHours() % 12 || 12;
}

function random(number) {
  return Math.floor(Math.random() * number) + 1;
}

function getWindDirection(deg, lang) {
  switch (true) {
    case ((deg >= 348.75) || (deg < 11.25)):
      return 'N'
      break;
    case ((deg >= 11.25) && (deg < 33.75)):
      return 'NNE'
      break;
    case ((deg >= 33.75) && (deg < 56.25)):
      return 'NE'
      break;
    case ((deg >= 56.25) && (deg < 78.75)):
      return 'ENE'
      break;
    case ((deg >= 78.75) && (deg < 101.25)):
      return 'E'
      break;
    case ((deg >= 101.25) && (deg < 123.75)):
      return 'ESE'
      break;
    case ((deg >= 123.75) && (deg < 146.25)):
      return 'SE'
      break;
    case ((deg >= 146.25) && (deg < 168.75)):
      return 'SSE'
      break;
    case ((deg >= 168.75) && (deg < 191.25)):
      return 'S'
      break;
    case ((deg >= 191.5) && (deg < 213.75)):
      if (lang == 'en') {
        return 'SSW'
      } else {
        return 'SSO'
      }
      break;
    case ((deg >= 213.75) && (deg < 236.25)):
      if (lang == 'en') {
        return 'SW'
      } else {
        return 'SO'
      }
      break;
    case ((deg >= 236.25) && (deg < 258.75)):
      if (lang == 'en') {
        return 'WSW'
      } else {
        return 'OSO'
      }
      break;
    case ((deg >= 258.75) && (deg < 281.25)):
      if (lang == 'en') {
        return 'W'
      } else {
        return 'O'
      }
      break;
    case ((deg >= 281.25) && (deg < 303.75)):
      if (lang == 'en') {
        return 'WNW'
      } else {
        return 'OSO'
      }
      break;
    case ((deg >= 303.75) && (deg < 326.25)):
      if (lang == 'en') {
        return 'NW'
      } else {
        return 'NO'
      }
      break;
    case ((deg >= 326.25) && (deg < 348.75)):
      if (lang == 'en') {
        return 'NNW'
      } else {
        return 'NNO'
      }
  }

}

function chkUnit_toggle(s) {
  var lang = s.checked ? "en" : "es"

  for (var i = 0; i < localization[lang].length; i++) {
    var a = localization[lang][i];
    var dom = document.getElementById(a.id)
    if (dom.text) {
      dom.text = a.text
    }
    else if (dom.textContent) {
      dom.textContent = a.text
    }
  }
  let unit;
  if (s.checked) {//english
    unit = 'imperial'
  } else {
    unit = 'metric';

  }

  var className = document.getElementsByClassName('card');
  for (var index = 0; index < className.length; index++) {
    let city = className[index].getAttribute('city');
    let lat = className[index].getAttribute('lat');
    let lon = className[index].getAttribute('lon');
    getWeather(lat, lon, lang, unit, city);
  }


}


function getCards(api_url) {
  fetch(api_url).then((response) => response.json()).then((data) => displayCards(data.list)
  )
}

function displayCards(cities) {
  for (let i = 0; i < cities.length; i++) {
    var target = document.getElementById("wrapper-grid");
    let tempHTML = ''
    tempHTML = '<div class="card" city="' + i + '" lat="' + cities[i].lat + '" lon="' + cities[i].lon + '"> ' +
      '<img class="card-img-top" src="./images/' + (cities[i].ciudad).toLowerCase() + '/' + random(3) + '.jpg" alt="Card image">' +
      '                  <div class="container"> ' +
      '        <div class="citytemp"> ' +
      '            <h3 class="city" id="ciudad' + i + '">' + cities[i].ciudad + '</h3>    ' +
      '             <h1 class="temp" id="temp' + i + '">35°C</h1>' +
      '             <h4 id = "feels' + i + '">35°C</h4>  ' +
      '        </div>                ' +
      '        <div class="icondesc"> ' +
      '             <img src="" alt="" class="iconbig" id="icon' + i + '"/>' +
      '             <h6 id="desc' + i + '">Cloudy</h6>' +
      '             <div class="minmax">        ' +
      '                <img class ="icon" src="./icons/min24.png" alt="" class="icon" /> ' +
      '                <h7 id = "min' + i + '">35°C</h7> ' +
      '                <img class ="icon" src="./icons/max24.png" alt="" class="icon" /> ' +
      '                <h7 id = "max' + i + '">35°C</h7>' +
      '            </div>' +
      '        </div>      ' +
      '        <div class="extradata">' +
      '            <div>' +
      '                <img class ="icon" src="./icons/humidity24.png" alt="" class="icon" /> ' +
      '                <h7 class="icon-text" id="humedad' + i + '">Humdad: </h7> ' +
      '            </div>' +
      '            <div>' +
      '                <img class ="icon" src="./icons/viento24.png" alt="" class="icon" /> ' +
      '               <h7 class="icon-text" id="viento' + i + '">6.2 km/h</h7>' +
      '            </div>' +
      '       </div>' +
      '        <div class="extradata2">' +
      '            <div>' +
      '                <img class ="icon" src="./icons/sunrise24.png" alt="" class="icon" /> ' +
      '                <h7 class="icon-text" id="sunrise' + i + '"></h7> ' +
      '            </div>' +
      '            <div>' +
      '                <img class ="icon" src="./icons/sunset24.png" alt="" class="icon" />' +
      '                <h7 class="icon-text" id="sunset' + i + '"></h7>' +
      '            </div>' +
      '        </div>' +
      '     </div>';

    tempHTML += '<div class="future">  ';
    for (let j = 1; j <= 4; j++) {
      tempHTML += '<div class="hours">' +
        '           <h6 id="hour' + i + j + '"></h6>' +
        '           <div><img id="iconHour' + i + j + '" src="./icons/weather24/01d.png" alt="" class="icon" /></div>' +
        '           <h6 id="tempHour' + i + j + '">35°C</h6>' +
        '          </div>'
    }
    tempHTML += '  <div class="lhour">' +
      '             <h6 id="hour' + i + '5"></h6>' +
      '             <img id="iconHour' + i + '5" src="./icons/weather24/01d.png" alt="" class="icon" />' +
      '             <h6 id="tempHour' + i + '5">35°C</h6>' +
      '            </div>' +
      '</div>';


    tempHTML += '<div class="future">  ';
    for (let j = 1; j <= 4; j++) {
      tempHTML += '<div class="days">' +
        '           <h6 id="day' + i + j + '"></h6>' +
        '           <div><img id="icon' + i + j + '" src="./icons/weather24/01d.png" alt="" class="icon" /></div>' +
        '           <h6 id="temp' + i + j + '">35°C</h6>' +
        '          </div>'
    }
    tempHTML += '  <div class="lday">' +
      '              <h6 id="day' + i + '5"></h6>' +
      '              <img id="icon' + i + '5" src="./icons/weather24/01d.png" alt="" class="icon" />' +
      '              <h6 id="temp' + i + '5">35°C</h6>' +
      '            </div>' +
      '</div>';
    target.innerHTML += tempHTML;

  }
  chkUnit_toggle(document.getElementById("chkUnit"));
}


function getWeather(lat, lon, lang, unit, num) {
  fetch("https://api.openweathermap.org/data/2.5/weather?"
    + "lat=" + lat
    + "&lon=" + lon
    + "&lang=" + lang
    + "&units=" + unit
    + "&appid=" + apikey)
    .then((response) => response.json()).then((data) => displayWeather(lat, lon, data, num, unit, lang))
}

function displayWeather(lat, lon, data, num, unit, lang) {
  const { sunrise, sunset, country } = data.sys
  const { timezone } = data
  const { description, icon } = data.weather[0]
  const { temp, feels_like, temp_min, temp_max, humidity } = data.main
  const { speed, deg } = data.wind
  let sunriseTime = ''
  let sunsetTime = ''
  let timeSunrise = new Date((sunrise) * 1000);
  let timeSunset = new Date((sunset) * 1000);
  if (country == 'US') {
    sunriseTime = timeSunrise.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York' });
    sunsetTime = timeSunset.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York' });
  } else {
    sunriseTime = timeSunrise.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Europe/Madrid' })
    sunsetTime = timeSunset.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Europe/Madrid' })
  }

  sunriseTime = sunriseTime.substring(0, sunriseTime.indexOf(" ")) + ' AM';
  sunsetTime = sunsetTime.substring(0, sunsetTime.indexOf(" ")) + ' PM';


  let displayUnit = ''
  let displaySpeed = ''

  if (unit == 'metric') {
    displayUnit = '°C'
    displaySpeed = 'm/s'
  } else {
    displayUnit = '°F'
    displaySpeed = 'mph'
  }

  document.getElementById('temp' + num).innerText = Math.round(temp) + displayUnit;
  document.getElementById('feels' + num).innerText = Math.round(feels_like) + displayUnit;

  document.getElementById('icon' + num).src = "./icons/weather64/" + icon + ".png";
  document.getElementById('desc' + num).innerText = description.charAt(0).toUpperCase() + description.slice(1);
  document.getElementById('min' + num).innerText = Math.round(temp_min) + displayUnit;
  document.getElementById('max' + num).innerText = Math.round(temp_max) + displayUnit;

  document.getElementById('humedad' + num).innerText = humidity + '%';
  document.getElementById('viento' + num).innerText = speed + ' ' + displaySpeed + ' ' + this.getWindDirection(deg, lang);

  document.getElementById('sunrise' + num).textContent = sunriseTime;
  document.getElementById('sunset' + num).textContent = sunsetTime;

  getForecast(lat, lon, lang, unit, num, displayUnit);
}

function getForecast(lat, lon, lang, unit, num, displayUnit) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?"
    + "lat=" + lat
    + "&lon=" + lon
    + "&lang=" + lang
    + "&units=" + unit
    + "&appid=" + apikey)
    .then((response) => response.json()).then((data) => displayForecast(data, num, unit, lang, displayUnit))
}

function displayForecast(data, num, unit, lang, displayUnit) {

  const { country, timezone } = data.city
  for (let j = 1; j < 6; j++) {
    populateFutureHours(data, num, j, displayUnit, country, timezone);
  }

  let daytemp = (new Date()).toLocaleDateString(locale, { weekday: 'short' });
  let index;
  for (let i = 0; i < 40; i++) {
    let day1 = (new Date((data.list[i].dt) * 1000)).toLocaleDateString(locale, { weekday: 'short' });
    if ((daytemp != day1)) {
      index = i + 2;
      break;
    }
  }
  populateFuture(data, num, 1, displayUnit, index, locale, lang, timezone);
  populateFuture(data, num, 2, displayUnit, index + 8, locale, lang, timezone);
  populateFuture(data, num, 3, displayUnit, index + 16, locale, lang, timezone);
  populateFuture(data, num, 4, displayUnit, index + 24, locale, lang, timezone);
  if ((index + 32) < 40) {
    populateFuture(data, num, 5, displayUnit, index + 32, locale, lang, timezone);
  } else {
    populateFuture(data, num, 5, displayUnit, 39, locale, lang, timezone);
  }

}

function populateFutureHours(data, card, j, displayUnit, country, timezone) {
  let hour;
  let dt_txt = data.list[j - 1].dt_txt;
  const date = data.list[j - 1].dt;


  if (country == 'US') {
    hour = (new Date(date * 1000)).toLocaleTimeString(locale, { hour: 'numeric', hour12: true, timeZone: 'America/New_York' })
    hora = (new Date(date * 1000)).toLocaleTimeString(locale, { hour: 'numeric', hour12: false, timeZone: 'America/New_York' })
  } else {
    hour = (new Date(date * 1000)).toLocaleTimeString(locale, { hour: 'numeric', hour12: true, timeZone: 'Europe/Madrid' })
    hora = (new Date(date * 1000)).toLocaleTimeString(locale, { hour: 'numeric', hour12: false, timeZone: 'America/New_York' })
  }
  if (hora > 12) {
    sistema = ' PM'
  } else {
    sistema = ' AM'
  }

  hour = hour.substring(0, hour.indexOf(" ")) + sistema;

  let icon = data.list[j - 1].weather[0].icon
  let temp = data.list[j - 1].main.temp
  hour = hour.replace(".", "");
  hour = hour.replace(".", "").toUpperCase();
  document.getElementById('hour' + card + j).innerText = hour;
  document.getElementById('iconHour' + card + j).src = "./icons/weather24/" + icon + ".png"
  document.getElementById('tempHour' + card + j).innerText = Math.round(temp) + displayUnit
}

function populateFuture(data, card, day, displayUnit, index, locale, lang, timezone) {
  let dt_txt = data.list[index].dt_txt;
  const date = data.list[index].dt;
  let fecha = (new Date(date * 1000)).toLocaleString(lang, { weekday: 'short' })
  let icon = data.list[index].weather[0].icon
  let temp = data.list[index].main.temp
  document.getElementById('day' + card + day).innerText = fecha.charAt(0).toUpperCase() + fecha.slice(1);
  document.getElementById('icon' + card + day).src = "./icons/weather24/" + icon + ".png"
  document.getElementById('temp' + card + day).innerText = Math.round(temp) + displayUnit
}


const userLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;

const locale = userLocale[0] + userLocale[1]

let seasson = ''
month = (new Date()).toLocaleDateString(locale, { month: "2-digit" });
day = (new Date()).toLocaleDateString(locale, { day: "2-digit" });

let season = getSeason(month, day);

var link = document.querySelector("link[rel~='icon']");
if (!link) {
  link = document.createElement('link');
  link.rel = 'icon';
  document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = './icons/' + seasson + '.png'


let language = ''

if ((locale) == 'en') {
  document.getElementById("chkUnit").checked = true;
  language = 'en'
  getCards('./data/cities.json');

}
else {
  language = 'es'
  document.getElementById("chkUnit").checked = false;
  getCards('./data/ciudades.json');
}


