var today= new Date();
if(today.getMinutes()<10)
{
  var time= today.getHours()+" : 0"+today.getMinutes();
}
else{
  var time= today.getHours()+" : "+today.getMinutes();
}

const apikey="5ef777fec45e196132cf4844b99a850b";


const deg="\xB0 C";
$(".time").text(time);
window.addEventListener("load",()=>{
  let long;
  let lat;
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
      long=position.coords.longitude;
      lat=position.coords.latitude;
      const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=06dff67c99601c67ce0ac156c751798d `
      fetch(api)
      .then(res => res.json())
      .then(data=> {
        //console.log(data);
        const {name}=data;
        var temp=data.main.temp;
        var humid=data.main.humidity;
        var wind= data.wind.speed;
        var desc=data.weather[0].description;
        desc=desc.charAt(0).toUpperCase()+desc.slice(1).toLowerCase();
        var icon=data.weather[0].icon;
        var visible=data.visibility;
        visible=visible/1000;
        const img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";

        $(".city").text(name);
        $(".temp").text(Math.round(temp-273)+deg);
        $(".description").text(desc);
        $(".wind").text(wind+" m/s");
        $(".humidity").text(humid+" %");
        $(".visibility").text(visible+" km");
        $("#weather-icon").attr('src',img_url);
    
      })
    }

    )}

})


$(".search-btn").click(function(){
  var input=document.getElementById('inputcity').value;
 input= input.charAt(0).toUpperCase()+input.slice(1).toLowerCase();
  $(".city").text(input);
  $(".time").text(time);
  const url="https://api.openweathermap.org/data/2.5/weather?q="+input+"&appid="+apikey+"&units=metric";
  fetch(url)
  .then(res => res.json())
  .then(data=> {
    //console.log(data);
    var temp=data.main.temp;
    var humid=data.main.humidity;
    var wind= data.wind.speed;
    var desc=data.weather[0].description;
    desc=desc.charAt(0).toUpperCase()+desc.slice(1).toLowerCase();
    var icon=data.weather[0].icon;
    var visible=data.visibility;
    visible=visible/1000;
    const img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";

    $(".temp").text(temp+deg);
    $(".description").text(desc);
    $(".wind").text(wind+" m/s");
    $(".humidity").text(humid+" %");
    $(".visibility").text(visible+" km");
    $("#weather-icon").attr('src',img_url);

  })
});
