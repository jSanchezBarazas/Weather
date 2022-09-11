var localization = {
    "es":
    [
        {id:"headtittle", text:"Weather"},
    ],
    "en": 
    [
        {id:"headtittle", text:"Tiempo"},
    ] 
  }

  function toggleLanguage(s)
{
  var lang = s.checked? "es": "en"
  for(var i = 0; i<localization[lang].length;i++){
  var a = localization[lang][i];
    var dom = document.getElementById(a.id)
    if(dom.text){
      dom.text= a.text
    }
    else if(dom.textContent){
      dom.textContent= a.text
    }
  }
  if (s.checked){      
    weather.fetchWeather("36.83","-2.46","en","imperial","1");
    weather.fetchWeather("40.06","-85.54","en","imperial","2");
    weather.fetchWeather("37.59","-2.26","en","imperial","3");
    weather.fetchWeather("36.71","-4.41","en","imperial","4");
  }else{
    weather.fetchWeather("36.83","-2.46","sp","metric","1")
    weather.fetchWeather("40.06","-85.54","sp","metric","2");
    weather.fetchWeather("37.59","-2.26","sp","metric","3");
    weather.fetchWeather("36.71","-4.41","sp","metric","4");
  }
}

function populateFuture (data,card,day, displayUnit,i, locale){
  let fecha = (new Date((data.list[i].dt)*1000)).toLocaleDateString('locale', {weekday: 'short'})
  let icon=data.list[i].weather[0].icon
  let temp =data.list[i].main.temp

  
  document.getElementById('day'+card+day).innerText=fecha.charAt(0).toUpperCase()+fecha.slice(1);
  document.getElementById('icon'+card+day).src="./icons/weather24/"+icon+".png"
  document.getElementById('temp'+card+day).innerText=Math.round(temp)+displayUnit
}

function getDirection(deg, lang){
switch (true)  {
    case ((deg >= 348.75) || (deg < 11.25)) :
      return 'N'
    break;
    case ((deg >= 11.25) && (deg < 33.75)) : 
      return 'NNE'
    break;
    case ((deg >= 33.75) && (deg < 56.25)) :
      return 'NE'
    break;
    case ((deg >= 56.25) && (deg < 78.75)) :
      return 'ENE'
    break;
    case ((deg >= 78.75) && (deg < 101.25)) :
      return 'E'
    break;
    case ((deg >= 101.25) && (deg < 123.75)) :
      return 'ESE'
    break;
    case ((deg >= 123.75) && (deg < 146.25)) :
      return 'SE'
    break;
    case ((deg >= 146.25) && (deg < 168.75)) :
      return 'SSE'
    break;
    case ((deg >= 168.75) && (deg < 191.25)) :
      return 'S'
    break;
    case ((deg >= 191.5) && (deg < 213.75)) :
      if (lang=='en') { 
        return 'SSW' 
      } else {
        return 'SSO'
      }
    break;
    case ((deg >= 213.75) && (deg < 236.25)) :
      if (lang=='en') { 
        return 'SW' 
      } else {
        return 'SO'
      }
    break;
    case ((deg >= 236.25) && (deg < 258.75)) :
      if (lang=='en') { 
        return 'WSW' 
      } else {
        return 'OSO'
      }
    break;
    case((deg >= 258.75) && (deg < 281.25)) :
      if (lang=='en') { 
        return 'W' 
      } else {
        return 'O'
      }
    break;
    case((deg >= 281.25) && (deg < 303.75)) :
      if (lang=='en') { 
        return 'WNW' 
      } else {
        return 'OSO'
      }
    break;
    case ((deg >= 303.75) && (deg < 326.25)) :
      if (lang=='en') { 
        return 'NW' 
      } else {
        return 'NO'
      }
    break;
    case ((deg >= 326.25) && (deg < 348.75)) :
      if (lang=='en') { 
        return 'NNW' 
      } else {
        return 'NNO'
      }
  }

}

let weather ={
  "apikey":"43a2945a6d8d45fe8147d44181ef632b",
  fetchWeather : function(lat,lon,lang,unit,num){
    fetch("https://api.openweathermap.org/data/2.5/weather?"
    + "lat="+lat
    + "&lon="+lon
    + "&lang="+lang
    + "&units="+unit
    + "&appid="+this.apikey)
    .then((response)=>response.json()).then((data)=>this.displayWeather(data,num,unit, locale, lang))
  },

  displayWeather: function(data,num,unit, locale, lang){
    const {sunrise, sunset, country }=data.sys
    const {name}=data
    const {description, icon}=data.weather[0]
    const {temp,feels_like, temp_min, temp_max, humidity}=data.main
    const {speed, deg} =data.wind
    let sunriseTime=''
    let sunsetTime=''
    if (country=='US'){
      sunriseTime = (new Date((sunrise)*1000)).toLocaleTimeString(locale,{hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York'})
      sunsetTime = (new Date((sunset)*1000)).toLocaleTimeString(locale,{hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York'})
    }else{
      sunriseTime = (new Date((sunrise)*1000)).toLocaleTimeString(locale,{hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Europe/Madrid'})
      sunsetTime = (new Date((sunset)*1000)).toLocaleTimeString(locale,{hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Europe/Madrid'})
    }

    let displayUnit = ''
    let displaySpeed= ''
    
    if (unit == 'metric'){
      displayUnit = '°C'
      displaySpeed = 'm/s'
    }else{
      displayUnit = '°F'
      displaySpeed = 'mph'
    }

    document.getElementById('ciudad'+num).innerText=name;
    document.getElementById('temp'+num).innerText=Math.round(temp)+displayUnit;
    document.getElementById('feels'+num).innerText=Math.round(feels_like)+displayUnit;

    document.getElementById('icon'+num).src="./icons/weather64/"+icon+".png";
    document.getElementById('desc'+num).innerText=description.charAt(0).toUpperCase()+description.slice(1);
    document.getElementById('min'+num).innerText=Math.round(temp_min)+displayUnit;
    document.getElementById('max'+num).innerText=Math.round(temp_max)+displayUnit;

    document.getElementById('humedad'+num).innerText=humidity+'%';
    document.getElementById('viento'+num).innerText=speed+' '+displaySpeed+ ' '+getDirection(deg, lang);

    document.getElementById('sunrise'+num).textContent=sunriseTime;
    document.getElementById('sunset'+num).textContent=sunsetTime;

   // let icon1=data.list[8].weather[0].icon
    //let temp1 =data.list[0].main.temp

   /* for (let i = 1; i < 6; i++) {     
      populateFuture (data, 1,i, displayUnit)
    }*/
   /*
    let daytemp = (new Date((data.list[0].dt)*1000)).toLocaleDateString(locale, {weekday: 'short'});
    let day = 1;
    for (let i = 0; i<40; i++){
      let day1 = (new Date((data.list[i].dt)*1000)).toLocaleDateString(locale, {weekday: 'short'});
      if ((daytemp != day1) ) {
        let index = i+3;
        if (index>39){
          index=39
        }
    //    populateFuture (data, num, day, displayUnit, index, locale)
        daytemp=day1;
        day= day+1;
    }
    }*/
  }

  }

  const userLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
  
  let locale = userLocale[0]+userLocale[1]
  
  let language = ''
  
  if ((locale)=='en'){
      document.getElementById("chkUnit").checked=true;
      language = 'en'
    }
    else{
      language = 'es'
      document.getElementById("chkUnit").checked=false;
    }
  
  toggleLanguage(document.getElementById("chkUnit"))