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

  function toggleLanguage(s, locale)
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
      weather.fetchWeather("36.83","-2.46",locale,"imperial","1")
      weather.fetchWeather("40.06","-85.54",locale,"imperial","2");
    }else{
      weather.fetchWeather("36.83","-2.46",locale,"metric","1")
      weather.fetchWeather("40.06","-85.54",locale,"metric","2");
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


let weather ={
  "apikey":"43a2945a6d8d45fe8147d44181ef632b",
  fetchWeather : function(lat,lon,lang,unit,num){
    fetch("https://api.openweathermap.org/data/2.5/forecast?"
    + "lat="+lat
    + "&lon="+lon
    + "&lang="+lang
    + "&units="+unit
    + "&appid="+this.apikey)
    .then((response)=>response.json()).then((data)=>this.displayWeather(data,num,unit, locale))
  },

  displayWeather: function(data,num,unit, locale){
    const {sunrise, sunset, name}=data.city
    const {temp, feels_like, humidity}=data.list[0].main
    const {description, icon}=data.list[0].weather[0]
    const {speed}=data.list[0].wind
    let sunriseTime=''
    let sunsetTime=''
    if (locale='es'){
      sunriseTime = (new Date((sunrise)*1000)).toLocaleTimeString(locale,{hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Europe/Madrid'})
      sunsetTime = (new Date((sunset)*1000)).toLocaleTimeString(locale,{hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Europe/Madrid'})
    }else{
      sunriseTime = (new Date((sunrise)*1000)).toLocaleTimeString(locale,{hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New York'})
      sunsetTime = (new Date((sunset)*1000)).toLocaleTimeString(locale,{hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New York'})
    }
    console.log(name)

    let displayUnit = ''
    let displaySpeed= ''
    
    if (unit == 'metric'){
      displayUnit = '°C'
      displaySpeed = 'km/h'
    }else{
      displayUnit = '°F'
      displaySpeed = 'mph'
    }

    document.getElementById('temp'+num).innerText=Math.round(temp)+displayUnit;
    document.getElementById('ciudad'+num).innerText=name;
    document.getElementById('feels'+num).innerText=Math.round(feels_like)+displayUnit;
    document.getElementById('icon'+num).src="./icons/weather64/"+icon+".png";
    document.getElementById('desc'+num).innerText=description.charAt(0).toUpperCase()+description.slice(1);
    document.getElementById('humedad'+num).innerText=humidity+'%';
    document.getElementById('viento'+num).innerText=speed+' '+displaySpeed;
    document.getElementById('sunrise'+num).textContent=sunriseTime;
    document.getElementById('sunset'+num).textContent=sunsetTime;
    
    let icon1=data.list[8].weather[0].icon
    let temp1 =data.list[0].main.temp

   /* for (let i = 1; i < 6; i++) {     
      populateFuture (data, 1,i, displayUnit)
    }*/
    let daytemp = (new Date((data.list[0].dt)*1000)).toLocaleDateString(locale, {weekday: 'short'});
    let day = 1;
    for (let i = 0; i<40; i++){
      let day1 = (new Date((data.list[i].dt)*1000)).toLocaleDateString(locale, {weekday: 'short'});
      if ((daytemp != day1) ) {
        let index = i+3;
        if (index>39){
          index=39
        }
        populateFuture (data, num, day, displayUnit, index, locale)
        daytemp=day1;
        day= day+1;
    }
    }
  }
  }

  const userLocale =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;
  
    console.log(userLocale)  
  let locale = userLocale[0]+userLocale[1]
  if ((locale)=='en'){
      document.getElementById("chkUnit").checked=true;
    }
    else{
      document.getElementById("chkUnit").checked=false;
    }
  toggleLanguage(document.getElementById("chkUnit"), locale)