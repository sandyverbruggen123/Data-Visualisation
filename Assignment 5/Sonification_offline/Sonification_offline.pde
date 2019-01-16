// Loading JSON https://processing.org/reference/loadJSONArray_.html
// weather data from https://openweathermap.org/current

// import libraries for osc
import oscP5.*;
import netP5.*;

// variables 
OscP5 port;
NetAddress address;
String[] capitals = {"Canberra", "Vienna", "Baku", "Brussels", "Brasilia", "Sofia", "Ottawa", "Santiago", "Beijing", "Zagreb", "Havana", "Prague", "Copenhagen", "Cairo", "Helsinki", "Paris", "Berlin", "Athens", "Budapest", "Reykjavik", "Tehran", "Dublin", "Jerusalem", "Rome", "Tokyo", "Riga", "Skopje", "Kathmandu", "Amsterdam", "Oslo", "Lima", "Lisbon", "Doha", "Singapore", "Madrid", "Stockholm", "Bern", "Bangkok", "Ankara", "London", "Wellington"};

JSONObject json;
JSONArray jsonArray;
JSONArray JSONArrayDescriptions;
float temp;
float windSpeed;
float humidity;
float clouds;
float snow;
String name;
String capital;
String description;

JSONObject tempData;
JSONObject windData;
JSONObject cloudsData;
JSONObject descriptionData;

void setup() {
  port = new OscP5(this, 9999);
  address = new NetAddress("127.0.0.1", 9999);
  getWeatherData();
}

// function to collect data from API and send them to pure data via osc
void getWeatherData(){
   //for (int i = 0; i < capitals.length; i++) {
   //capital = capitals[i]; //http://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=934d3167fc7f0ec28960d432afdfa1d9
   //json = loadJSONObject("http://api.openweathermap.org/data/2.5/weather?q=" + capital + "&units=metric&APPID=934d3167fc7f0ec28960d432afdfa1d9");
   jsonArray = loadJSONArray("weatherData.json");
   println(jsonArray.size());
   
   for (int i = 0; i < jsonArray.size();i++){
    delay(800);
   // get all json objects from array 
   json = jsonArray.getJSONObject(i);    
   tempData = json.getJSONObject("main");
   windData = json.getJSONObject("wind");
   cloudsData = json.getJSONObject("clouds");
   JSONArrayDescriptions = json.getJSONArray("weather");
   descriptionData = JSONArrayDescriptions.getJSONObject(0);
   
   // get right data from json objects
   humidity = tempData.getInt("humidity");    
   temp = tempData.getFloat("temp");
   name = json.getString("name");
   windSpeed = windData.getFloat("speed");
   clouds = cloudsData.getFloat("all");
   description = descriptionData.getString("description");

   // wait 800 milliseconds before sending the next message
   delay(800);
   
   // create messages
   OscMessage messageTemp = new OscMessage("/temp");
   OscMessage messageName = new OscMessage("/name");
   OscMessage messageHumidity = new OscMessage("/humidity");
   OscMessage messageSnow = new OscMessage("/snow");
   OscMessage messageClouds = new OscMessage("/clouds");
   OscMessage messageWind = new OscMessage("/wind");
   OscMessage messageDescription = new OscMessage("/description");
   
   // add right variable to the messages
   messageTemp.add(temp);
   messageName.add(name);
   messageHumidity.add(humidity);
   messageSnow.add(snow);
   messageClouds.add(clouds);
   messageWind.add(windSpeed);
   messageDescription.add(description);
   
   // send the filled messages to the right address
   port.send(messageTemp, address);
   port.send(messageName, address);
   port.send(messageHumidity, address);
   port.send(messageSnow, address);
   port.send(messageClouds, address);
   port.send(messageWind, address);
   port.send(messageDescription, address);
   }
}
