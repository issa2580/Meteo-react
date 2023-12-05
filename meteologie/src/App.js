import React from 'react';

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Box'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CompressIcon from '@mui/icons-material/Compress';
import SpeedIcon from '@mui/icons-material/Speed';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
/*import { render } from 'react-dom'*/
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from './component/form';
import { Typography } from '@mui/material';

const cloudStyle = {
  fontSize: '32px',
  fontWeight: 700,
  fontStyle: 'normal',
  lineHeight: 'normal'
}

const cloudStyles = {
  fontSize: '52px',
  fontWeight: 700,
  fontStyle: 'normal',
  lineHeight: 'normal'
}

const debStyle = {
  fontSize: '32px',
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: 'normal'
}

const debStyles = {
  fontSize: '23px',
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: 'normal'
}



const API_Key = "6334a3edfd0059fa5504ef1b1f847965";

class App extends React.Component {
  constructor (){
    super ();
    this.state = {
      capital: undefined,
      icon: undefined,
      main: undefined,
      celsius: 0,
      min: 0,
      max: 0,
      feels: 0,
      pressure: 0,
      humidity: 0,
      speed: 0,
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
        min: response.main.temp_min,
        max: response.main.temp_max,
        feels: response.main.feels_like,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
        speed: response.wind.speed,
        description: response.weather[0].description
        
      });
  
      this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
    }else{
      this.setState({error: true});
    }

  };

  render (){
    return (
      <>
      <Container>
        <Box 
          sx={{
            mt: '50px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            border: '1px solid rgba(0,0,0,0.7)',
            borderRadius: '5px',
            padding: '20px 40px'
          }}>
          <Box>
            <Form loadWeather = {this.getWeather} error = {this.state.error} />
          </Box>
          <Box sx={{
            display: {xs: 'none', md: 'flex', lg: 'flex'},
            justifyContent: 'center', 
            alignItems: 'center',
            background: 'white',
            padding: '15px 60px',
            border: '1px solid rgba(0,0,0,0.7)',
            borderRadius: '5px',
            color: 'black'
          }}>
            <Typography sx={{...cloudStyle}}><span>&deg;C</span></Typography>
          </Box>
        </Box>

        <Box 
          sx={{
            my: {xs: '50px', md: '130px', lg: '130px'},
            display: {xs: 'flex', md: 'flex', lg: 'flex'},
            flexDirection: {xs: 'column', md: 'row', lg: 'row'},
            justifyContent: {xs: 'center', md: 'space-between', lg: 'space-between'},
            alignItems: 'center',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            border: '1px solid rgba(0,0,0,0.7)',
            borderRadius: '5px',
            padding: '20px 40px'
          }}>
          <Box sx={{
            display: 'grid', 
            justifyContent: 'center', 
            alignItems: 'center',
            py: '5px'
            }}>
            <div class="city">
              <Typography sx={{...cloudStyle}}>{this.state.capital}</Typography>
            </div>
            <i style={{'color':'white'}} className={`wi ${this.state.icon} display-1`}></i>
            <div style={{paddingTop: '20px'}} class="weather">
              <Typography sx={{...cloudStyle}}>{this.state.description}</Typography>
            </div>
          </Box>

          <Box>
          <div class="date">
            <Typography sx={{...cloudStyle}}>{new Date().toLocaleString()}</Typography>  
          </div>
          </Box>

          <Box 
            sx={{
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              textAlign: 'center'
            }}>
            <div class="temp">
              <Typography sx={{...cloudStyles}}>
                {Math.round(this.state.celsius)}<span>&deg;c</span>
              </Typography>
            </div>
          </Box>
        </Box>

        <div style={{ width: '100%'}}>
          <Box 
            sx={{ 
              display: 'grid', 
              marginBottom: '10px',
              gap: {xs: '10px', md: '50px', lg: '50px'}, 
              gridTemplateColumns: 'repeat(3, 1fr)',
              '@media (max-width: 767px)': {
                gridTemplateColumns: '1fr',
                marginBottom: '10px',
                fontSize: '32px',
                fontWeight: 500,
              },
            }}>
          <Box
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: '1px solid rgba(0,0,0,0.7)',
                borderRadius: '5px',
                padding: '20px 40px'
              }}>
              <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', 
                    gap: '10px'}}>
                  <Box  
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: '5px'}}>
                      <Box><ArrowDownwardIcon style={{width: '25px', height: '25px'}} /></Box>
                      <Box>
                        <Typography sx={{...debStyles}}>Min</Typography>
                      </Box>
                  </Box>
                  <Box>
                    <div class="hi-low">
                    <Typography sx={{...debStyles}}>{Math.round(this.state.min)}&deg;c</Typography>
                    </div>
                  </Box>
                </Box>
            </Box>
            <Box
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: '1px solid rgba(0,0,0,0.7)',
                borderRadius: '5px',
                padding: '20px 40px'
              }}>
              <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', 
                    textAlign: 'center',
                    gap: '10px'}}>
                  <Box  
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '5px'}}>
                      <Box><ArrowUpwardIcon style={{width: '25px', height: '25px'}} /></Box>
                      <Box>
                        <Typography sx={{...debStyles}}>Max</Typography>
                      </Box>
                  </Box>
                  <Box>
                    <div class="hi-low">
                      <Typography sx={{...debStyles}}>{Math.round(this.state.max)}&deg;c</Typography>
                    </div>
                  </Box>
                </Box>
            </Box>
            <Box
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: '1px solid rgba(0,0,0,0.7)',
                borderRadius: '5px',
                padding: '20px 40px'
              }}>
              <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', 
                    textAlign: 'center',
                    gap: '10px'}}>
                  <Box  
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '5px'}}>
                      <Box><EmojiEmotionsIcon style={{width: '25px', height: '25px'}} /></Box>
                      <Box>
                        <Typography sx={{...debStyles}}>Feels_like</Typography>
                      </Box>
                  </Box>
                  <Box>
                    <div class="hi-low">
                      <Typography sx={{...debStyles}}>{Math.round(this.state.feels)}&deg;c</Typography>  
                    </div>
                  </Box>
                </Box>
            </Box>
          </Box>
        </div>

        <div style={{ width: '100%' }}>
          <Box 
            sx={{ 
              display: 'grid', 
              gap: {xs: '10px', md: '50px', lg: '50px'}, 
              gridTemplateColumns: 'repeat(3, 1fr)',
              '@media (max-width: 767px)': {
                gridTemplateColumns: '1fr',
                fontSize: '32px',
                fontWeight: 500,
              },
            }}>
            <Box
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: '1px solid rgba(0,0,0,0.7)',
                borderRadius: '5px',
                padding: '20px 40px'
              }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', 
                    gap: '10px'}}>
                  <Box  
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: '5px'}}>
                      <Box><CompressIcon style={{width: '25px', height: '25px'}} /></Box>
                      <Box>
                        <Typography sx={{...debStyles}}>Pressure</Typography>
                      </Box>
                  </Box>
                  <Box>
                    <div class="hi-low">
                      <Typography sx={{...debStyles}}>{Math.round(this.state.pressure)}&deg;c</Typography>  
                    </div>
                  </Box>
                </Box>
            </Box>
            <Box
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: '1px solid rgba(0,0,0,0.7)',
                borderRadius: '5px',
                padding: '20px 40px'
              }}>
              <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center', 
                    gap: '10px'}}>
                  <Box  
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '5px'}}>
                      <Box><SpeedIcon style={{width: '25px', height: '25px'}} /></Box>
                      <Box>
                        <Typography sx={{...debStyles}}>Humidity</Typography>
                      </Box>
                  </Box>
                  <Box>
                    <div class="hi-low">
                      <Typography sx={{...debStyles}}>{Math.round(this.state.humidity)}&deg;c</Typography>
                    </div>
                  </Box>
                </Box>
            </Box>
            <Box
              sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: '1px solid rgba(0,0,0,0.7)',
                borderRadius: '5px',
                padding: '20px 40px'
              }}>
              <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', 
                    textAlign: 'center',
                    gap: '10px'}}>
                  <Box  
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '5px'}}>
                      <Box><AirIcon style={{width: '20px', height: '20px'}} /></Box>
                      <Box>
                        <Typography sx={{...debStyles}}>Wind speed</Typography>
                      </Box>
                  </Box>
                  <Box>
                    <div class="hi-low">
                      <Typography sx={{...debStyles}}>{Math.round(this.state.speed)}&deg;c</Typography> 
                    </div>
                  </Box>
                </Box>
            </Box>
          </Box>
        </div>
      </Container>

      </>
      // <body>
      //   <div class="app-wrap">
      //     <legend className="title">Weather App</legend>
      //     <header>
      //       <Form loadWeather = {this.getWeather} error = {this.state.error} />
      //     </header>
      //     <main>
      //       <section class="location">
      //         <div class="city">{this.state.capital}</div>
      //         <div class="date">{new Date().toLocaleString()}</div>
      //       </section>
      //       <div class="current">
      //         <div class="temp">{Math.round(this.state.celsius)}<span>&deg;c</span></div>
      //         <div class="weather">{this.state.description}</div>
      //         <i style={{'color':'white'}} className={`wi ${this.state.icon} display-1`}></i>
      //         <div class="hi-low">{Math.round(this.state.min)}&deg;c / {Math.round(this.state.max)}&deg;c</div>
      //       </div>
      //     </main>
      //   </div>
      // </body>
    );
  }
}

export default App;
