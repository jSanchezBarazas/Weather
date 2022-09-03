var localization = {
    "es":
    [
        {id:"headtittle", text:"Weather"},
        {id:"humedad", text:"Humidity"},
        {id:"viento", text:"Wind speed"}
    ],
    "en": 
    [
        {id:"headtittle", text:"Tiempo"},
        {id:"humedad", text:"Humedad"},
        {id:"viento", text:"Vel. Viento"}
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
  
}