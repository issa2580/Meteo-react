import React from 'react';
/*import { render } from 'react-dom'*/
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from "./component/weather";
import Form from './component/form';


const API_Key = "6334a3edfd0059fa5504ef1b1f847965";

class App extends React.Component {
  constructor (){
    super ();
    this.state = {
      capital: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      error: false,
      description: ""
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons,numId){
    switch (true){
      case numId >= 200 && numId <= 232:
        this.setState({icon:this.weatherIcon.Thunderstorm});
      break;

      case numId >= 300 && numId <= 321:
        this.setState({icon:this.weatherIcon.Drizzle});
      break;

      case numId >= 500 && numId <= 531:
        this.setState({icon:this.weatherIcon.Rain});
      break;

      case numId >= 600 && numId <= 622:
        this.setState({icon:this.weatherIcon.Snow});
      break;

      case numId >= 701 && numId <= 781:
        this.setState({icon:this.weatherIcon.Atmosphere});
      break;

      case numId === 800:
        this.setState({icon:this.weatherIcon.Clear});
      break;

      case numId >= 801 && numId <= 804:
        this.setState({icon:this.weatherIcon.Clouds});
      break;

      default:
        this.setState({icon:this.weatherIcon.Clouds})
    }
  }

  getWeather = async (e) => {
    e.preventDefault ();
    const capital = e.target.elements.capital.value;

    if(capital){
      const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_Key}&units=metric`);
      const response = await url.json();
      console.log(response);
  
      this.setState({
        capital: `${response.name}, ${response.sys.country}`,
        celsius: response.main.temp,
        description: response.weather[0].description
        
      });
  
      this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
    }else{
      this.setState({error: true});
    }

  };

  render (){
    return (
      <div className="app">
        <Form loadWeather = {this.getWeather} error = {this.state.error} />
        <Weather 
          capital = {this.state.capital} 
          temp = {this.state.celsius} 
          description = {this.state.description}
          weatherIcon = {this.state.icon}
        />
      </div>
    );
  }
}

export default App;