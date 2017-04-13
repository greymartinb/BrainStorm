

var weatherUrl= 'http://api.openweathermap.org/data/2.5/weather?id=';

var weatherKey= "4672c700529a4955e9c846a45b800e34";

var cityID= "4671654"; 



var updateWeather = function(){
    $.ajax({
    	url: weatherUrl+cityID+ "&units=imperial&appid="+weatherKey,
    	method: "GET",
    	 success: function(result){
        console.log(result);
        $("#weather").html( "<img src = http://openweathermap.org/img/w/" + result.weather[0].icon + ".png> </img> Current Temperature : " +result.main.temp +"&deg; F" );
    }})
};

