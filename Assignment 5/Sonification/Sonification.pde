// Loading JSON https://processing.org/reference/loadJSONArray_.html
// weather data from https://openweathermap.org/current

// import libraries for osc
import oscP5.*;
import netP5.*;

// variables 
OscP5 port;
NetAddress address;
String[] capitals = {"Canberra", "Vienna", "Baku", "Brussels", "Brasilia", "Sofia", "Ottawa", "Santiago", "Beijing", "Zagreb", "Havana", "Prague", "Copenhagen", "Cairo", "Helsinki", "Paris", "Berlin", "Athens", "Budapest", "Reykjavik", "Tehran", "Dublin", "Jerusalem", "Rome", "Tokyo", "Riga", "Skopje", "Kathmandu", "Amsterdam", "Oslo", "Lima", "Lisbon", "Doha", "Singapore", "Madrid", "Stockholm", "Bern", "Bangkok", "Ankara", "London", "Wellington"};
String[] messages;

JSONObject json;
JSONArray JSONArrayDescriptions;
float temp;
float windSpeed;
float humidity;
float clouds;
float snow;
String name;
String capital;
String description;

void setup() {
  // setup port and addres
  port = new OscP5(this, 9999);
  address = new NetAddress("127.0.0.1", 9999);
  // get data from every captial once
  getWeatherData();
}

// function to collect data from API and send them to pure data via osc
void getWeatherData(){
  for (int i = 0; i < capitals.length; i++) {
   capital = capitals[i]; //http://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=934d3167fc7f0ec28960d432afdfa1d9
   json = loadJSONObject("http://api.openweathermap.org/data/2.5/weather?q=" + capital + "&units=metric&APPID=934d3167fc7f0ec28960d432afdfa1d9");
   // get jsonobjects
   JSONObject mainData = json.getJSONObject("main");
   JSONObject windData = json.getJSONObject("wind");
   JSONObject cloudsData = json.getJSONObject("clouds");
   JSONArrayDescriptions = json.getJSONArray("weather");
   JSONObject descriptionData = JSONArrayDescriptions.getJSONObject(0);
   // get right data from the jsonobjects
   humidity = mainData.getInt("humidity");    
   temp = mainData.getFloat("temp");
   name = json.getString("name");
   windSpeed = windData.getFloat("speed");
   clouds = cloudsData.getFloat("all");
   description = descriptionData.getString("description");

   // wait 2000 milliseconds before sending the next message
   delay(1000);
   
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
