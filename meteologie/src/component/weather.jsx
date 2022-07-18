import React from "react";

const Weather = props => {
    return(
        <div className="containerWeather" id="weather">
            <div className="cards">
                <fieldset className="field" >
                    <h1>
                        {props.capital}
                    </h1>
                    <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                    </h5>
                    {props.temp ? (
                        <h1 className="py-2">{Math.round(props.temp)}&deg;</h1>
                    ) :null}

                    <h4 className="py-3">{props.description}</h4> 
                </fieldset>
            </div>  
        </div>
    );
    
};

export default Weather;