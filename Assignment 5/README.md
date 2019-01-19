# Assignment 5: Weather data sonification

## Process
First I loaded the real-time weather data in to Processing, send the data via open sound control to pure data. In pure data I received the data from the temperature, clouds, humidity, wind, name of the capital and a description of the Weather. The sounds change according these data. 
<br>
Temperature changes pitch from oscilator. The higher the temperature, the higher the pitch.
<br>
Clouds changes the roomsize of the reverb. So if there more clouds you hear more echos from the original sound.
<br>
Humidity changes noise (the noise makes a rainy sound). The more rain, the louder the rainy sound.
<br>
Wind change speed of a sample made in Reaper. This sample sounds like "tuuut". If the speed of the wind is fast you hear the "tuuut"-sounds play faster. I also made a sound that sounds like the wind. This is also made with noise but with a bandpassfilter on. The only disadvantage is that you can hear the sound of the wind if there is rain. So that's why I also made a sample for it. 
<br>

I also made an visualisation in pure data to show the name of the capital en the description of the weather.

<br>
<br>
Real-time data from: https://openweathermap.org/api

## Goal
I wanted to make sounds according to weather data from different capitals and create dynamic natural sound waves by using the weather data as input.  

## Properties
Explanatory - Linear - Auditive - Node-based

## Final result
Video: https://github.com/sandyverbruggen123/Data-Visualisation/blob/master/Assignment%205/FinalResultSonification.mp4
