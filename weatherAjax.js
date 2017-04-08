

var weatherUrl= 'http://samples.openweathermap.org/data/2.5/weather?id='

var key= "7493fd19a0b18456df921db68599485e";

var cityID= "5016884";



var updateWeather = function(){
    $.ajax({
    	url: weatherUrl+cityID+ "&appid="+key, success: function(result){
        console.log(result);
    }})
};


